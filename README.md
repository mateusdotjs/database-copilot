# Database Copilot

An agentic text-to-SQL app. You ask a question in plain language about a sample store database. A LangGraph agent reads the schema, writes read-only SQL, runs it, and answers in text. The same database operations are exposed as an MCP server for other agents.

The UI is a single input with a few example questions (best-selling product, customers in São Paulo, revenue by category, total order value).

## Stack

The interesting part is the agent loop. Everything else is there to host it.

**Agent runtime.** [LangGraph](https://langchain-ai.github.io/langgraph/) (`@langchain/langgraph`) owns the workflow. Each question starts a `StateGraph`: load the schema, call the model, and keep looping through SQL until the model stops requesting tools. Tool calls run through LangGraph's `ToolNode`.

**Model.** The agent is a [LangChain](https://js.langchain.com/) chat model backed by [OpenRouter](https://openrouter.ai/) (`@langchain/openrouter`). The model id comes from `OPENROUTER_MODEL`, so you can swap providers without touching the graph.

**Tools.** The in-app agent binds LangChain tools that call the database service directly. The model never gets a database connection. It only sees those tools. `execute_query` uses a Postgres role limited to `SELECT`.

**MCP.** [`@nestjs/mcp`](https://docs.nestjs.com/mcp/overview) exposes the same two operations as a server named `db-copilot` at `/mcp`, for other agents. The in-app agent does not connect to it.

- `get_schema` returns public columns and foreign keys from `information_schema`.
- `execute_query` runs the SQL the caller wrote.

**API.** [NestJS](https://nestjs.com/) hosts the MCP server, the agent, and `POST /questions`. [Drizzle](https://orm.drizzle.team/) talks to Postgres for the read-only tool connection and for the schema migrations.

**Data.** PostgreSQL 18 in Docker. Sample tables: categories, customers, products, orders, and order items.

**UI.** React, Vite, TypeScript, Tailwind CSS, and TanStack Query. The dev server proxies `/questions` to the API. No chat history: one question, one answer.

## How it works

1. The UI posts the question to `POST /questions`.
2. The graph loads the schema and injects the result into the system prompt.
3. The OpenRouter model answers, or emits a tool call for `execute_query`.
4. If it asked for SQL, LangGraph runs the query on the read-only role and sends the rows back to the model.
5. That loop repeats until the model returns plain text. Markdown is stripped before the response goes to the UI.

## Requirements

- Node.js 22+
- Docker

## Setup

Start Postgres:

```bash
docker compose up -d
```

This creates the `app` database and a read-only user (`mcp_user`). The init script runs only the first time the volume is created.

Create `api/.env`:

```env
PORT=3000
OPENROUTER_API_KEY=your-openrouter-key
OPENROUTER_MODEL=openai/gpt-6-luna
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/app
DATABASE_URL_READONLY=postgresql://mcp_user:mcp_password@localhost:5432/app
```

Apply the schema and load the sample data:

```bash
cd api
npm install
set -a && source .env && set +a
npx drizzle-kit migrate
npx tsx --env-file=.env src/database/seed.ts
```

## Run

API (http://localhost:3000), from `api/`:

```bash
npm run start:dev
```

Frontend (http://localhost:5173), from `frontend/`:

```bash
npm install
npm run dev
```

The Vite dev server proxies `/questions` to the API.

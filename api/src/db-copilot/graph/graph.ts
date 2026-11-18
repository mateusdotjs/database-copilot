import { END, START, StateGraph } from '@langchain/langgraph';
import { AIMessage } from '@langchain/core/messages';
import type { GraphNodes } from './nodes.js';
import { stateSchema } from './state.js';

const MAX_SQL_CALLS = 2;

export const EMPTY_ANSWER = 'Não consegui obter um resultado para responder.';

export function readAnswer(state: typeof stateSchema.State) {
  const text = state.messages.at(-1)?.text.trim() ?? '';

  return {
    answer: text || EMPTY_ANSWER,
    queries: readQueries(state),
  };
}

function readQueries(state: typeof stateSchema.State) {
  return state.messages.flatMap((message) => {
    if (!AIMessage.isInstance(message)) {
      return [];
    }

    return (message.tool_calls ?? []).flatMap((call) => {
      const query = call.args.query;

      return call.name === 'execute_query' && typeof query === 'string'
        ? [query]
        : [];
    });
  });
}

export function routeAfterAgent(state: typeof stateSchema.State) {
  const message = state.messages.at(-1);
  const wantsSql = AIMessage.isInstance(message) && !!message.tool_calls?.length;

  if (!wantsSql) {
    return END;
  }

  const sqlCalls = state.messages.filter(
    (entry) => AIMessage.isInstance(entry) && !!entry.tool_calls?.length,
  ).length;

  return sqlCalls <= MAX_SQL_CALLS ? 'execute_sql' : END;
}

export function createGraph(nodes: GraphNodes) {
  return new StateGraph(stateSchema)
    .addNode('get_schema', nodes.get_schema)
    .addNode('agent', nodes.agent)
    .addNode('execute_sql', nodes.execute_sql)
    .addEdge(START, 'get_schema')
    .addEdge('get_schema', 'agent')
    .addConditionalEdges('agent', routeAfterAgent, {
      execute_sql: 'execute_sql',
      [END]: END,
    })

    .addEdge('execute_sql', 'agent')
    .compile();
}

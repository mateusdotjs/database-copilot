import { Injectable } from '@nestjs/common';
import { HumanMessage } from '@langchain/core/messages';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { Agent } from './agent/model.js';
import { McpClient } from './mcp/client.js';
import { createNodes } from './graph/nodes.js';
import { createGraph, readAnswer } from './graph/graph.js';

@Injectable()
export class Copilot {
  constructor(
    private readonly agent: Agent,
    private readonly mcp: McpClient,
  ) {}

  async ask(question: string) {
    const tools = await this.mcp.getTools();
    const nodes = createNodes({
      model: this.agent.agent,
      getSchemaTool: this.tool(tools, 'get_schema'),
      executeQueryTool: this.tool(tools, 'execute_query'),
    });
    const state = await createGraph(nodes).invoke({
      messages: [new HumanMessage(question)],
    });

    return readAnswer(state);
  }

  private tool(tools: DynamicStructuredTool[], name: string) {
    const found = tools.find((tool) => tool.name === name);

    if (!found) {
      throw new Error(`MCP tool "${name}" was not found`);
    }

    return found;
  }
}

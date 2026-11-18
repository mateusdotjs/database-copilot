import { Injectable } from '@nestjs/common';
import { HumanMessage } from '@langchain/core/messages';
import { GraphRecursionError } from '@langchain/langgraph';
import { Agent } from './agent/model.js';
import { createAgentTools } from './agent/tools.js';
import { ToolsService } from './mcp/tools.service.js';
import { createNodes } from './graph/nodes.js';
import { createGraph, EMPTY_ANSWER, readAnswer } from './graph/graph.js';

@Injectable()
export class Copilot {
  private readonly tools: ReturnType<typeof createAgentTools>;

  constructor(
    private readonly agent: Agent,
    tools: ToolsService,
  ) {
    this.tools = createAgentTools(tools);
  }

  async ask(question: string) {
    const nodes = createNodes({
      model: this.agent.agent,
      getSchemaTool: this.tools.getSchemaTool,
      executeQueryTool: this.tools.executeQueryTool,
    });
    try {
      const state = await createGraph(nodes).invoke(
        { messages: [new HumanMessage(question)] },
        { recursionLimit: 8 },
      );

      return readAnswer(state);
    } catch (error) {
      if (error instanceof GraphRecursionError) {
        return EMPTY_ANSWER;
      }

      throw error;
    }
  }
}

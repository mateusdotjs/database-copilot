import { SystemMessage } from '@langchain/core/messages';
import { ChatOpenRouter } from '@langchain/openrouter';
import { StructuredTool } from '@langchain/core/tools';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { AGENT_PROMPT } from '../agent/prompt.js';
import { stateSchema } from './state.js';

interface CreateNodesParams {
  model: ChatOpenRouter;
  getSchemaTool: StructuredTool;
  executeQueryTool: StructuredTool;
}

export function createNodes({
  model,
  getSchemaTool,
  executeQueryTool,
}: CreateNodesParams) {
  return {
    get_schema: async () => {
      const schema = await getSchemaTool.invoke({});

      return {
        schema: String(schema),
      };
    },

    agent: async (state: typeof stateSchema.State) => {
      const response = await model
        .bindTools([executeQueryTool])
        .invoke([
          new SystemMessage(
            `${AGENT_PROMPT}\n\nDatabase schema:\n${state.schema}`,
          ),
          ...state.messages,
        ]);

      return {
        messages: [response],
      };
    },

    execute_sql: new ToolNode([executeQueryTool]),
  };
}

export type GraphNodes = ReturnType<typeof createNodes>;
import { END, START, StateGraph } from '@langchain/langgraph';
import { AIMessage } from '@langchain/core/messages';
import type { GraphNodes } from './nodes.js';
import { stateSchema } from './state.js';

const EMPTY_ANSWER = 'Não consegui obter um resultado para responder.';

export function readAnswer(state: typeof stateSchema.State) {
  const text = state.messages.at(-1)?.text.trim() ?? '';

  return text || EMPTY_ANSWER;
}

export function createGraph(nodes: GraphNodes) {
  return new StateGraph(stateSchema)
    .addNode('get_schema', nodes.get_schema)
    .addNode('agent', nodes.agent)
    .addNode('execute_sql', nodes.execute_sql)
    .addEdge(START, 'get_schema')
    .addEdge('get_schema', 'agent')
    .addConditionalEdges(
      'agent',
      (state) => {
        const message = state.messages.at(-1);

        return AIMessage.isInstance(message) && message.tool_calls?.length
          ? 'execute_sql'
          : END;
      },
      {
        execute_sql: 'execute_sql',
        [END]: END,
      },
    )

    .addEdge('execute_sql', 'agent')
    .compile();
}

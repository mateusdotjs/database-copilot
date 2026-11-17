import { tool } from '@langchain/core/tools';
import * as z from 'zod';
import { ToolsService } from '../mcp/tools.service.js';

export function createAgentTools(tools: ToolsService) {
  return {
    getSchemaTool: tool(async () => JSON.stringify(await tools.getSchema()), {
      name: 'get_schema',
      description: 'Get the schema of the database',
      schema: z.object({}),
    }),
    executeQueryTool: tool(async ({ query }) => tools.executeQuery(query), {
      name: 'execute_query',
      description: 'Execute a readonly query on the database',
      schema: z.object({
        query: z.string(),
      }),
    }),
  };
}

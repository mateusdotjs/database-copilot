import { Injectable } from '@nestjs/common';
import { Tool } from '@nestjs/mcp';
import { DbCopilotService } from './db-copilot.service.js';
import * as z from 'zod';

@Injectable()
export class DbCopilotTools {
  constructor(private readonly dbCopilotService: DbCopilotService) {}

  @Tool({
    description: 'Get the schema of the database',
  })
  async get_schema() {
    return this.dbCopilotService.getSchema();
  }

  @Tool({
    description: 'Execute a readonly query on the database',
    inputSchema: z.object({
      query: z.string(),
    }),
  })
  async execute_query({ query }: { query: string }) {
    return this.dbCopilotService.executeQuery(query);
  }
}

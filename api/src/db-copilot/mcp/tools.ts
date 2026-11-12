import { Injectable } from '@nestjs/common';
import { Tool } from '@nestjs/mcp';
import { ToolsService } from './tools.service.js';
import * as z from 'zod';

@Injectable()
export class Tools {
  constructor(private readonly ToolsService: ToolsService) {}

  @Tool({
    description: 'Get the schema of the database',
  })
  async get_schema() {
    return this.ToolsService.getSchema();
  }

  @Tool({
    description: 'Execute a readonly query on the database',
    inputSchema: z.object({
      query: z.string(),
    }),
  })
  async execute_query({ query }: { query: string }) {
    return this.ToolsService.executeQuery(query);
  }
}

import { Module } from '@nestjs/common';
import { ToolsService } from './mcp/tools.service.js';
import { Tools } from './mcp/tools.js';
import { Agent } from './agent/model.js';
import { Copilot } from './copilot.js';

@Module({
  providers: [ToolsService, Tools, Agent, Copilot],
  exports: [Copilot],
})
export class DbCopilotModule {}

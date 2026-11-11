import { Module } from '@nestjs/common';
import { DbCopilotService } from './db-copilot.service.js';
import { DbCopilotTools } from './db-copilot.tools.js';

@Module({
  providers: [DbCopilotService, DbCopilotTools]
})
export class DbCopilotModule {}

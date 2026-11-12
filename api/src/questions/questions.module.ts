import { Module } from '@nestjs/common';
import { DbCopilotModule } from '../db-copilot/db-copilot.module.js';
import { QuestionsService } from './questions.service.js';
import { QuestionsController } from './questions.controller.js';

@Module({
  imports: [DbCopilotModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}

import { Body, Controller, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service.js';
import {
  askQuestionSchema,
  type AskQuestionDto,
} from './ask-question.schema.js';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  ask(@Body({ schema: askQuestionSchema }) body: AskQuestionDto) {
    return this.questionsService.ask(body.question);
  }
}

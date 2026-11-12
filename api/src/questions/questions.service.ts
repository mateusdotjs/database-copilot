import { Injectable } from '@nestjs/common';
import { Copilot } from '../db-copilot/copilot.js';

@Injectable()
export class QuestionsService {
  constructor(private readonly copilot: Copilot) {}

  async ask(question: string) {
    const answer = await this.copilot.ask(question);

    return { answer };
  }
}

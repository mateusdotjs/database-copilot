import { Injectable } from '@nestjs/common';
import { Copilot } from '../db-copilot/copilot.js';

function plainText(answer: string) {
  return answer
    .replace(/```[a-z]*\n?([\s\S]*?)```/gi, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/(\*\*\*|___)([\s\S]*?)\1/g, '$2')
    .replace(/(\*\*|__)([\s\S]*?)\1/g, '$2')
    .replace(/(\*|_)([\s\S]*?)\1/g, '$2')
    .replace(/~~([\s\S]*?)~~/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\*\*|__|~~/g, '');
}

@Injectable()
export class QuestionsService {
  constructor(private readonly copilot: Copilot) {}

  async ask(question: string) {
    const { answer, queries } = await this.copilot.ask(question);

    return { answer: plainText(answer), queries };
  }
}

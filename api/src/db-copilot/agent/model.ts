import { ChatOpenRouter } from '@langchain/openrouter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Agent {
  readonly agent: ChatOpenRouter;

  constructor(config: ConfigService) {
    this.agent = new ChatOpenRouter({
      model: config.getOrThrow('OPENROUTER_MODEL'),
      apiKey: config.getOrThrow('OPENROUTER_API_KEY'),
    });
  }
}

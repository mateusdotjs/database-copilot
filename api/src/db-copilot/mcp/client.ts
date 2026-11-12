import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { MCPAdapter } from '@langchain/mcp-adapters';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class McpClient implements OnModuleDestroy {
  readonly client: MCPAdapter;

  constructor(config: ConfigService) {
    this.client = new MCPAdapter({
      servers: {
        'db-copilot': {
          url: config.getOrThrow('MCP_SERVER_URL'),
        },
      },
      prefixToolNameWithServerName: false,
    });
  }

  getTools() {
    return this.client.listTools();
  }

  onModuleDestroy() {
    this.client.close();
  }
}

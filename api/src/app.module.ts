import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DrizzleModule } from '@nestjs/drizzle';
import { drizzle } from 'drizzle-orm/node-postgres';
import { McpModule } from '@nestjs/mcp';
import { DbCopilotModule } from './db-copilot/db-copilot.module.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DrizzleModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        drizzle,
        connection: config.getOrThrow('DATABASE_URL'),
      }),
    }),
    DrizzleModule.forRootAsync({
      name: 'readonly',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        drizzle,
        connection: config.getOrThrow('DATABASE_URL_READONLY'),
      }),
    }),
    McpModule.forRoot({
      name: 'db-copilot',
      version: '1.0.0',
      include: [DbCopilotModule],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

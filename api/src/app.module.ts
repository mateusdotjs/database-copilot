import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DrizzleModule } from '@nestjs/drizzle';
import { drizzle } from 'drizzle-orm/node-postgres';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppGateway } from './app.gateway';
import typeorm from './config/typeorm';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { BoardsModule } from './modules/boards/boards.module';
import { CommentsModule } from './modules/comments/comments.module';
import { MediaModule } from './modules/media/media.module';
import { SlicesModule } from './modules/slices/slices.module';
import { SocketModule } from './modules/socket/socket.module';
import { StepsModule } from './modules/steps/steps.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { TodosModule } from './modules/todos/todos.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    UsersModule,
    TasksModule,
    BoardsModule,
    SlicesModule,
    StepsModule,
    CommentsModule,
    AuthModule,
    TodosModule,
    SocketModule,
    MediaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppGateway,
  ],
})
export class AppModule {}

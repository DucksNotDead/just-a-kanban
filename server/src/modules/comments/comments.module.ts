import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsController } from './comments.controller';
import { Comment } from './comments.model';
import { CommentsService } from './comments.service';
import { BoardsModule } from '../boards/boards.module';
import { SocketModule } from '../socket/socket.module';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  providers: [CommentsService],
  imports: [
    TypeOrmModule.forFeature([Comment]),
    BoardsModule,
    TasksModule,
    SocketModule,
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}

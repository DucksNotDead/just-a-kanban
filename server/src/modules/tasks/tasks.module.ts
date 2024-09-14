import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksController } from './tasks.controller';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';
import { BoardsModule } from '../boards/boards.module';
import { CommentsModule } from '../comments/comments.module';
import { SlicesModule } from '../slices/slices.module';
import { SocketModule } from "../socket/socket.module";
import { StepsModule } from '../steps/steps.module';
import { TodosModule } from "../todos/todos.module";
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UsersModule,
    SlicesModule,
    StepsModule,
    BoardsModule,
    forwardRef(() => TodosModule),
    forwardRef(() => CommentsModule),
    SocketModule,
  ],
  providers: [TasksService],
  exports: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}

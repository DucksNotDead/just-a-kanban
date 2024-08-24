import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksController } from './tasks.controller';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';
import { BoardsModule } from '../boards/boards.module';
import { SocketModule } from "../socket/socket.module";
import { SprintsModule } from '../sprints/sprints.module';
import { StepsModule } from '../steps/steps.module';
import { TodosModule } from "../todos/todos.module";
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UsersModule,
    SprintsModule,
    StepsModule,
    BoardsModule,
    forwardRef(() => TodosModule),
    SocketModule,
  ],
  providers: [TasksService],
  exports: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodosController } from './todos.controller';
import { Todo } from './todos.model';
import { TodosService } from './todos.service';
import { BoardsModule } from '../boards/boards.module';
import { SocketModule } from '../socket/socket.module';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  providers: [TodosService],
  imports: [
    TypeOrmModule.forFeature([Todo]),
    forwardRef(() => TasksModule),
    BoardsModule,
    SocketModule,
  ],
  exports: [TodosService],
  controllers: [TodosController],
})
export class TodosModule {}

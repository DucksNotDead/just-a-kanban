import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TodoCreateDto } from './dto/todo-create-dto';
import { ReqTodoId } from './todo.decorator';
import { TODO_ID_KEY } from './todos.const';
import { TodosService } from './todos.service';
import { BoardAccess } from '../../access/board';
import { TaskAccess } from '../../access/task';
import { ApiMethod } from '../../config/swagger';
import { ReqBoard } from '../boards/board.decorator';
import { Board } from '../boards/boards.model';
import { ReqTaskId } from '../tasks/task.decorator';
import { TASK_ID_KEY } from '../tasks/tasks.const';
import { ReqUser } from '../users/user.decorator';
import { User } from '../users/users.model';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly service: TodosService) {}

  @ApiMethod('Get task todos (task access)', {
    params: [TASK_ID_KEY],
  })
  @TaskAccess()
  @Get(`:${TASK_ID_KEY}`)
  getAll(@ReqTaskId() id: number) {
    return this.service.getByTask(id);
  }

  @ApiMethod('Create todo in task (board manager access)', {
    params: [TASK_ID_KEY],
    body: TodoCreateDto,
  })
  @BoardAccess(true)
  @Post(`:${TASK_ID_KEY}`)
  create(
    @ReqTaskId() taskId: number,
    @Body() dto: TodoCreateDto,
    @ReqBoard() board: Board,
    @ReqUser() user: User,
  ) {
    return this.service.create(dto, taskId, board.slug, user.id);
  }

  @ApiMethod('Toggle todo (task access)', {
    params: [TASK_ID_KEY, TODO_ID_KEY],
  })
  @TaskAccess(false, true)
  @Patch(`:${TASK_ID_KEY}/:${TODO_ID_KEY}`)
  toggle(
    @ReqTodoId() id: number,
    @ReqBoard() board: Board,
    @ReqUser() user: User,
  ) {
    return this.service.toggle(id, board.slug, user.id);
  }

  @ApiMethod('Delete todo (board manager access)', {
    params: [TASK_ID_KEY, TODO_ID_KEY],
  })
  @BoardAccess(true)
  @Delete(`:${TASK_ID_KEY}/:${TODO_ID_KEY}`)
  delete(
    @ReqTodoId() id: number,
    @ReqBoard() board: Board,
    @ReqUser() user: User,
  ) {
    return this.service.delete(id, board.slug, user.id);
  }
}

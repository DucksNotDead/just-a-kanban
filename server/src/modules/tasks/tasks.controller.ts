import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TaskCreateDto } from './dto/task-create-dto';
import { ReqTaskAccess, ReqTaskId } from './task.decorator';
import { ITaskAccess, TASK_ID_KEY } from './tasks.const';
import { TasksService } from './tasks.service';
import { BoardAccess } from '../../access/board';
import { TaskAccess } from '../../access/task';
import { ApiMethod } from '../../config/swagger';
import { ReqBoard } from '../boards/board.decorator';
import { BOARD_SLUG_KEY } from '../boards/boards.const';
import { Board } from '../boards/boards.model';
import { ReqUser } from '../users/user.decorator';
import { User } from '../users/users.model';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @ApiMethod('Get tasks by user board', {
    params: [BOARD_SLUG_KEY],
  })
  @BoardAccess()
  @Get(`:${BOARD_SLUG_KEY}`)
  getAll(@ReqBoard() board: Board, @ReqUser() user: User) {
    return this.service.getByUserBoard(board, user);
  }

  @ApiMethod('Get task access', {
    params: [TASK_ID_KEY],
  })
  @TaskAccess()
  @Get(`:${TASK_ID_KEY}`)
  getAccess(@ReqTaskAccess() access: ITaskAccess) {
    return access;
  }

  @ApiMethod('Create task (board manager access)', {
    params: [BOARD_SLUG_KEY],
  })
  @BoardAccess(true)
  @Post(`:${BOARD_SLUG_KEY}`)
  create(
    @ReqBoard() board: Board,
    @ReqUser() user: User,
    @Body() dto: TaskCreateDto,
  ) {
    return this.service.create({ ...dto, board }, user.id);
  }

  @ApiMethod('Change task order in step (board manager access)', {
    params: [TASK_ID_KEY, 'order'],
  })
  @BoardAccess(true)
  @Patch(`:${TASK_ID_KEY}/order/:order`)
  changeOrder(
    @ReqBoard() board: Board,
    @ReqTaskId() id: number,
    @ReqUser() user: User,
    @Param('order') order: number,
  ) {
    return this.service.changeOrder(order, id, board, user.id);
  }

  @ApiMethod('Change task step (board manager access)', {
    params: [TASK_ID_KEY, 'stepId'],
  })
  @BoardAccess(true)
  @Patch(`:${TASK_ID_KEY}/step/:stepId/manager`)
  managerChangeStep(
    @ReqUser() user: User,
    @ReqTaskId() id: number,
    @ReqBoard() board: Board,
    @Param('stepId') step: number,
  ) {
    return this.service.managerChangeStep(step, id, user, board.slug);
  }

  @ApiMethod('Change task step (task responsible access)', {
    params: [TASK_ID_KEY, 'stepId'],
  })
  @TaskAccess(true, true)
  @Patch(`:${TASK_ID_KEY}/step/:stepId/responsible`)
  responsibleChangeStep(
    @ReqTaskId() id: number,
    @Param('stepId') step: number,
    @ReqBoard() board: Board,
    @ReqUser() user: User,
  ) {
    return this.service.responsibleChangeStep(step, id, board.slug, user.id);
  }

  @ApiMethod('Set task reviewer (board manager access)', {
    params: [TASK_ID_KEY],
  })
  @BoardAccess(true)
  @Patch(`:${TASK_ID_KEY}/reviewer`)
  setReviewer(
    @ReqUser() user: User,
    @ReqTaskId() id: number,
    @ReqBoard() board: Board,
  ) {
    return this.service.setReviewer(user, id, board.slug);
  }

  @ApiMethod('Change task meta (board manager access)', {
    params: [TASK_ID_KEY],
    body: TaskCreateDto,
  })
  @BoardAccess(true)
  @Patch(`:${TASK_ID_KEY}/meta`)
  changeMeta(
    @ReqTaskId() id: number,
    @Body() dto: Partial<TaskCreateDto>,
    @ReqBoard() board: Board,
    @ReqUser() user: User,
  ) {
    return this.service.changeMeta(dto, id, board.slug, user.id);
  }

  @ApiMethod('Delete task (board manager access)', {
    params: [TASK_ID_KEY],
  })
  @BoardAccess(true)
  @Delete(`:${TASK_ID_KEY}`)
  delete(
    @ReqTaskId() id: number,
    @ReqBoard() board: Board,
    @ReqUser() user: User,
  ) {
    return this.service.delete(id, board.slug, user.id);
  }
}

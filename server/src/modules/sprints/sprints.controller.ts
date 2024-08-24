import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SprintUpdateDto } from './dto/sprint-update-dto';
import { ReqSprintId } from './sprint.decorator';
import { SPRINT_ID_KEY } from './sprints.const';
import { SprintsService } from './sprints.service';
import { BoardAccess } from '../../access/board';
import { ApiMethod } from '../../config/swagger';
import { ReqBoard } from '../boards/board.decorator';
import { BOARD_SLUG_KEY } from '../boards/boards.const';
import { Board } from '../boards/boards.model';
import { ReqUser } from '../users/user.decorator';
import { User } from '../users/users.model';

@ApiTags('sprints')
@Controller('sprints')
export class SprintsController {
  constructor(private readonly service: SprintsService) {}

  @ApiMethod('Get sprints by board', {
    params: [BOARD_SLUG_KEY],
  })
  @BoardAccess()
  @Get(`:${BOARD_SLUG_KEY}`)
  getAll(@ReqBoard() board: Board) {
    return this.service.getByBoard(board);
  }

  @ApiMethod('Create a new sprint (board manager access)', {
    params: [BOARD_SLUG_KEY],
    body: SprintUpdateDto,
  })
  @BoardAccess(true)
  @Post(`:${BOARD_SLUG_KEY}`)
  create(
    @Body() dto: SprintUpdateDto,
    @ReqBoard() board: Board,
    @ReqUser() user: User,
  ) {
    return this.service.create(dto, board, user.id);
  }

  @ApiMethod('Update sprint (board manager access)', {
    params: [SPRINT_ID_KEY],
    body: SprintUpdateDto,
  })
  @BoardAccess(true)
  @Put(`:${SPRINT_ID_KEY}`)
  update(
    @ReqSprintId() id: number,
    @ReqUser() user: User,
    @ReqBoard() board: Board,
    @Body() dto: SprintUpdateDto,
  ) {
    return this.service.update({ ...dto, id }, board.slug, user.id);
  }

  @ApiMethod('Delete sprint (board manager access)', {
    params: [SPRINT_ID_KEY],
  })
  @BoardAccess(true)
  @Delete(`:${SPRINT_ID_KEY}`)
  delete(
    @ReqSprintId() id: number,
    @ReqUser() user: User,
    @ReqBoard() board: Board,
  ) {
    return this.service.delete(id, board.slug, user.id);
  }
}

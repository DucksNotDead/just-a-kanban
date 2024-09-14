import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { StepsService } from './steps.service';
import { BoardAccess } from '../../access/board';
import { ApiMethod } from '../../config/swagger';
import { ReqBoard } from '../boards/board.decorator';
import { BOARD_SLUG_KEY } from '../boards/boards.const';
import { Board } from '../boards/boards.model';
import { ReqUser } from '../users/user.decorator';
import { User } from '../users/users.model';

@ApiTags('steps')
@Controller('steps')
export class StepsController {
  constructor(private readonly service: StepsService) {}

  @ApiMethod('Get steps')
  @Get()
  get() {
    return this.service.get();
  }

  @ApiMethod('Set reorder', { params: ['stepId', BOARD_SLUG_KEY, 'status'] })
  @BoardAccess(true)
  @Post(`:stepId/:${BOARD_SLUG_KEY}/:status`)
  setReorder(
    @Param() { stepId, status }: { stepId: string; status: 'start' | 'end' },
    @ReqBoard() board: Board,
    @ReqUser() user: User,
  ) {
    this.service.setReorder(stepId, board.slug, user.id, status);
  }
}

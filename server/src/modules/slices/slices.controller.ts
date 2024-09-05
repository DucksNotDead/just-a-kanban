import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SliceUpdateDto } from './dto/slice-update-dto';
import { ReqSliceId } from './slice.decorator';
import { SLICE_ID_KEY } from './slices.const';
import { SlicesService } from './slices.service';
import { BoardAccess } from '../../access/board';
import { ApiMethod } from '../../config/swagger';
import { ReqBoard } from '../boards/board.decorator';
import { BOARD_SLUG_KEY } from '../boards/boards.const';
import { Board } from '../boards/boards.model';
import { ReqUser } from '../users/user.decorator';
import { User } from '../users/users.model';

@ApiTags('slices')
@Controller('slices')
export class SlicesController {
  constructor(private readonly service: SlicesService) {}

  @ApiMethod('Get slices by board', {
    params: [BOARD_SLUG_KEY],
  })
  @BoardAccess()
  @Get(`:${BOARD_SLUG_KEY}`)
  getAll(@ReqBoard() board: Board) {
    return this.service.getByBoard(board.slug);
  }

  @ApiMethod('Create a new slice (board manager access)', {
    params: [BOARD_SLUG_KEY],
    body: SliceUpdateDto,
  })
  @BoardAccess(true)
  @Post(`:${BOARD_SLUG_KEY}`)
  create(
    @Body() dto: SliceUpdateDto,
    @ReqBoard() board: Board,
    @ReqUser() user: User,
  ) {
    return this.service.create(dto, board, user.id);
  }

  @ApiMethod('Update slice (board manager access)', {
    params: [SLICE_ID_KEY],
    body: SliceUpdateDto,
  })
  @BoardAccess(true)
  @Put(`:${SLICE_ID_KEY}`)
  update(
    @ReqSliceId() id: number,
    @ReqUser() user: User,
    @ReqBoard() board: Board,
    @Body() dto: SliceUpdateDto,
  ) {
    return this.service.update({ ...dto, id }, board.slug, user.id);
  }

  @ApiMethod('Delete slice (board manager access)', {
    params: [SLICE_ID_KEY],
  })
  @BoardAccess(true)
  @Delete(`:${SLICE_ID_KEY}`)
  delete(
    @ReqSliceId() id: number,
    @ReqUser() user: User,
    @ReqBoard() board: Board,
  ) {
    return this.service.delete(id, board.slug, user.id);
  }
}

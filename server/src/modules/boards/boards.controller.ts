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

import { ReqBoard, ReqBoardSlug } from './board.decorator';
import { BOARD_SLUG_KEY } from './boards.const';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';
import { BoardChangeUsersDto } from './dto/board-change-users-dto';
import { BoardCreateDto } from './dto/board-create-dto';
import { AdminAccess } from '../../access/admin';
import { BoardAccess } from '../../access/board';
import { ApiMethod } from '../../config/swagger';
import { ReqUser } from '../users/user.decorator';
import { User } from '../users/users.model';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly service: BoardsService) {}

  @ApiMethod('Get all user boards')
  @Get()
  getAll(@ReqUser() user: User) {
    return this.service.getAll(user.id);
  }

  @ApiMethod('Get board by slug (board access)', { params: [BOARD_SLUG_KEY] })
  @BoardAccess()
  @Get(`:${BOARD_SLUG_KEY}`)
  getBySlug(@ReqBoard() board: Board) {
    return this.service.getBySlug(board.slug);
  }

  @ApiMethod('Create new board (admin)', { body: BoardCreateDto })
  @AdminAccess()
  @Post()
  create(@ReqUser() user: User, @Body() boardCreateDto: BoardCreateDto) {
    return this.service.create({ ...boardCreateDto, userId: user.id });
  }

  @ApiMethod('Change board name (admin, board access)', {
    params: [BOARD_SLUG_KEY, 'name'],
  })
  @AdminAccess()
  @BoardAccess()
  @Patch(`:${BOARD_SLUG_KEY}/name/:name`)
  changeName(@ReqBoardSlug() slug: string, @Param('name') name: string) {
    return this.service.changeName(slug, name);
  }

  @ApiMethod('Change users in board (admin, board access)', {
    body: BoardChangeUsersDto,
    params: [BOARD_SLUG_KEY],
  })
  @AdminAccess()
  @BoardAccess()
  @Patch(`:${BOARD_SLUG_KEY}/users`)
  changeUsers(
    @ReqBoardSlug() slug: string,
    @ReqUser() user: User,
    @Body() boardChangeUsersDto: BoardChangeUsersDto,
  ) {
    return this.service.changeUsers(slug, {
      ...boardChangeUsersDto,
      userId: user.id,
    });
  }

  @ApiMethod('Delete board by slug (admin, board access)', {
    params: [BOARD_SLUG_KEY],
  })
  @AdminAccess()
  @BoardAccess()
  @Delete(`:${BOARD_SLUG_KEY}`)
  delete(@ReqBoard() board: Board) {
    return this.service.delete(board.slug);
  }
}

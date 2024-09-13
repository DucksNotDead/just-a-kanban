import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { UserCreateDto } from "./dto/user-create-dto";
import { ReqUser } from "./user.decorator";
import { User } from "./users.model";
import { UsersService } from "./users.service";
import { AdminAccess } from "../../access/admin";
import { BoardAccess } from "../../access/board";
import { ApiMethod } from "../../config/swagger";
import { ReqBoardSlug } from "../boards/board.decorator";
import { BOARD_SLUG_KEY } from "../boards/boards.const";

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiMethod('Get all users except current (admin)')
  @AdminAccess()
  @Get()
  getAll(@ReqUser() user: User) {
    return this.service.getAll(user.id);
  }

  @ApiMethod('Get users in chosen board (board access)', { params: [BOARD_SLUG_KEY] })
  @BoardAccess()
  @Get(`:${BOARD_SLUG_KEY}`)
  getByBoard(@ReqBoardSlug() slug: string) {
    return this.service.getByBoard(slug);
  }

  @ApiMethod('Create new user (admin)', { body: UserCreateDto })
  @AdminAccess()
  @Post()
  create(@Body() user: UserCreateDto) {
    return this.service.create(user);
  }

  @ApiMethod('Delete user (admin)', { params: ['id'] })
  @AdminAccess()
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}

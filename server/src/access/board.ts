import {
  CanActivate,
  ExecutionContext,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { Exception } from '../config/exception';
import { BOARD_KEY, BOARD_SLUG_KEY } from '../modules/boards/boards.const';
import { Board } from '../modules/boards/boards.model';
import { BoardsService } from '../modules/boards/boards.service';
import { SPRINT_ID_KEY } from '../modules/sprints/sprints.const';
import { TASK_ID_KEY } from '../modules/tasks/tasks.const';
import { User } from '../modules/users/users.model';

type TBoardRequest = Request & { user: User };

export async function boardAccessFn(
  service: BoardsService,
  context: ExecutionContext,
  managerAccess?: boolean,
) {
  try {
    const request: TBoardRequest = context.switchToHttp().getRequest();

    const {
      user,
      params: {
        [BOARD_SLUG_KEY]: boardSlug,
        [SPRINT_ID_KEY]: sprintId,
        [TASK_ID_KEY]: taskId,
      },
    } = request;

    const board: Board = boardSlug
      ? await service.getBySlug(boardSlug as string)
      : sprintId
        ? await service.getBySprint(Number(sprintId))
        : taskId
          ? await service.getByTask(Number(taskId))
          : null;

    const isBoardUser = await service.isBoardUser(
      board.id,
      user.id,
      managerAccess,
    );

    if (!isBoardUser) {throw Exception.AccessDenied();}

    request[BOARD_KEY] = board;
    return board;
  } catch (e) {
    throw Exception.AccessDenied();
  }
}

export const BoardAccess = (managerAccess?: boolean) => {
  class BoardAccessGuard implements CanActivate {
    constructor(
      @Inject(BoardsService) private readonly service: BoardsService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      return !!(await boardAccessFn(this.service, context, managerAccess));
    }
  }

  return UseGuards(BoardAccessGuard)
};

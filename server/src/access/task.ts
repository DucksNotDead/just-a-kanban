import { CanActivate, ExecutionContext, Inject, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { boardAccessFn } from './board';
import { Exception } from '../config/exception';
import { BoardsService } from '../modules/boards/boards.service';
import { TASK_ID_KEY } from '../modules/tasks/tasks.const';
import { TasksService } from '../modules/tasks/tasks.service';
import { USER_KEY } from '../modules/users/users.const';
import { User } from '../modules/users/users.model';

export const TaskAccess = (
  onlyForResponsible: boolean = false,
  lockOnReview: boolean = false,
) => {
  class TaskAccessGuard implements CanActivate {
    constructor(
      @Inject(BoardsService) private readonly boardsService: BoardsService,
      @Inject(TasksService) private readonly tasksService: TasksService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      try {
        const board = await boardAccessFn(this.boardsService, context);

        const request: Request & { [USER_KEY]: User } = context
          .switchToHttp()
          .getRequest();

        const {
          params: { [TASK_ID_KEY]: taskId },
          [USER_KEY]: user,
        } = request;

        const { responsible, reviewer } =
          await this.tasksService.getForTaskAccess(Number(taskId));

        const isManager = await this.boardsService.isBoardUser(
          board.id,
          user.id,
          true,
        );

        const isResponsible = responsible?.id === user.id;

        const isReviewer = reviewer?.id === user.id;

        const access =
          reviewer && lockOnReview
            ? isReviewer
            : isResponsible || (!onlyForResponsible && isManager);

        if (!access) {
          throw Exception.AccessDenied();
        }

        return true;
      } catch {
        throw Exception.AccessDenied();
      }
    }
  }
  return UseGuards(TaskAccessGuard);
};

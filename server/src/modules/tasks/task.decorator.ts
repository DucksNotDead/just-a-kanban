import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { ITaskAccess, TASK_ID_KEY, TASK_USER_ACCESS_KEY } from './tasks.const';

export const ReqTaskId = createParamDecorator(
  (data: unknown, context: ExecutionContext): number => {
    return Number(context.switchToHttp().getRequest().params[TASK_ID_KEY]);
  },
);

export const ReqTaskAccess = createParamDecorator(
  (data: unknown, context: ExecutionContext): ITaskAccess => {
    return context.switchToHttp().getRequest().params[TASK_USER_ACCESS_KEY];
  },
);

import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { TASK_ID_KEY } from './tasks.const';

export const ReqTaskId = createParamDecorator(
  (data: unknown, context: ExecutionContext): number => {
    return Number(context.switchToHttp().getRequest().params[TASK_ID_KEY]);
  },
);

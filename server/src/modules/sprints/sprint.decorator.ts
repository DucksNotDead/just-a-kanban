import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { SPRINT_ID_KEY } from './sprints.const';

export const ReqSprintId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().params[SPRINT_ID_KEY];
  },
);

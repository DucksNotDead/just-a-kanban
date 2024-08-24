import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { TODO_ID_KEY } from './todos.const';

export const ReqTodoId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return Number(context.switchToHttp().getRequest().params[TODO_ID_KEY]);
  },
);

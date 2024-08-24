import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { USER_KEY } from './users.const';

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: any = ctx.switchToHttp().getRequest();
    return request[USER_KEY];
  },
);

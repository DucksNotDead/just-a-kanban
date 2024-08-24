import { ExecutionContext, createParamDecorator } from "@nestjs/common";

import { BOARD_KEY, BOARD_SLUG_KEY } from "./boards.const";

export const ReqBoardSlug = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: any = context.switchToHttp().getRequest();
    return request[BOARD_SLUG_KEY];
  },
);

export const ReqBoard = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: any = context.switchToHttp().getRequest();
    return request[BOARD_KEY];
  },
);

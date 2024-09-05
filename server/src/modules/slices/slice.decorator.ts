import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { SLICE_ID_KEY } from './slices.const';

export const ReqSliceId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().params[SLICE_ID_KEY];
  },
);

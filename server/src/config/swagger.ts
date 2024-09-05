import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiProperty,
  refs,
} from '@nestjs/swagger';

const examples = {
  ID: 1,
  IDS: [1,2,3],
  NAME: 'John',
  USERNAME: 'john1234',
  PASSWORD: 'StrongPassword!1234',
  TASK_TITLE: 'Awesome task',
  TASK_ORDER: 3,
  TODO_LABEL: 'Poo bananas',
  TODOS: [{ label: 'Poo bananas' }],
  DATE: '01-01-1970T00:00',
  BOOLEAN: false,
  SLICE_NAME: 'frontend',
  COLOR: '#444eee',
  BOARD_NAME: 'Board Name',
  BOARD_SLUG: 'board-name',
  STEP_NAME: 'STEP NAME',
  COMMENT_TEXT: 'Вот тут кнопка не покрашена ;)',
  FILE: 'https://...'
} as const;

export const ApiField = (example: keyof typeof examples) =>
  ApiProperty({ example: examples[example] });

export const ApiMethod = (
  summary: string,
  options?: { params?: string[]; body?: Function },
) => {
  const BodyDecorator = options?.body
    ? applyDecorators(
        ApiExtraModels(options.body),
        ApiBody({ schema: { oneOf: refs(options.body) } }),
      )
    : () => {};
  const ParamDecorators = options?.params?.length
    ? options.params.map((param) => ApiParam({ name: param }))
    : [];
  return applyDecorators(
    ...ParamDecorators,
    BodyDecorator,
    ApiOperation({ summary }),
  );
};

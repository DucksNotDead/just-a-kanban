import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const Exception = {
  Unauthorized: () => new UnauthorizedException('Пользователь не авторизован'),
  NotFound: (item: string) => new NotFoundException(`Не найдено [${item}].`),
  Exist: (item: string, label?: string) =>
    new BadRequestException(
      `${item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()} с таким ${label ?? 'именем'} уже существует.`,
    ),
  BadRequest: (reason: string) => new BadRequestException(reason),
  AccessDenied: () => new ForbiddenException('В доступе отказано'),
};

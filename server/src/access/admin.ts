import {
  CanActivate,
  ExecutionContext,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { Exception } from "../config/exception";

class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const { user } = context.switchToHttp().getRequest();
      return user.isAdmin;
    } catch {
      throw Exception.AccessDenied()
    }
  }
}

export const AdminAccess = () => applyDecorators(UseGuards(AdminGuard));

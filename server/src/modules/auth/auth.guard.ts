import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { IS_PUBLIC_KEY } from './auth.const';
import { AuthService } from './auth.service';
import { Exception } from '../../config/exception';
import { User } from '../users/users.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (isPublic) {
        return true;
      }

      const request: Request & { user: User } = context
        .switchToHttp()
        .getRequest();
      request.user = await this.authService.auth(request.headers.authorization);
      return true;
    } catch (e) {
      throw Exception.Unauthorized();
    }
  }
}

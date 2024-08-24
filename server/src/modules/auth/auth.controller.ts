import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { PublicAccess } from '../../access/public';
import { ApiMethod } from '../../config/swagger';
import { UserCreditsDto } from '../users/dto/user-credits-dto';
import { ReqUser } from '../users/user.decorator';
import { User } from '../users/users.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiMethod('login by user credits', { body: UserCreditsDto })
  @PublicAccess()
  @Post('login')
  login(@Body() credits: UserCreditsDto) {
    return this.service.login(credits);
  }

  @ApiOperation({ summary: 'auth user by bearer in header' })
  @Post()
  auth(@ReqUser() user: User) {
    return user;
  }
}

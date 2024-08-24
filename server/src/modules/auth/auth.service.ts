import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import { Repository } from 'typeorm';

import { Exception } from '../../config/exception';
import { UserCreditsDto } from '../users/dto/user-credits-dto';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async auth(authorization: string) {
    try {
      const [type, token] = authorization?.split(' ');
      if (type !== 'Bearer') {throw Exception.Unauthorized();}
      const { username } = await this.jwtService.verifyAsync(token);

      if (!username) {throw Exception.Unauthorized();}

      const user = await this.users.findOneBy({ username });
      if (!user) {throw Exception.Unauthorized();}

      return user;
    } catch {
      throw Exception.Unauthorized();
    }
  }

  async login({ username, password }: UserCreditsDto) {
    const candidate = await this.users.findOne({
      where: { username },
      select: ['username', 'password'],
    });
    if (
      !candidate ||
      !(await this.comparePassword(password, candidate.password))
    )
      {throw Exception.NotFound('user');}
    return {
      token: await this.genToken(candidate),
      user: await this.users.findOneBy({ username }),
    };
  }

  async genToken({ id, username, name, password, isAdmin }: User) {
    return await this.jwtService.signAsync({
      id,
      username,
      name,
      password,
      isAdmin,
    });
  }

  async hashPassword(password: string) {
    return await hash(password, 9);
  }

  async comparePassword(password: string, hashPassword: string) {
    return await compare(password, hashPassword);
  }
}

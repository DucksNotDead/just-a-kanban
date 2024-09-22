import * as crypto from 'node:crypto';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { UserCreateDto } from './dto/user-create-dto';
import { User } from './users.model';
import { Exception } from '../../config/exception';
import { AuthService } from '../auth/auth.service';
import { BoardsService } from '../boards/boards.service';
import { MediaService } from '../media/media.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly authService: AuthService,
    private readonly boardsService: BoardsService,
    private readonly mediaService: MediaService,
  ) {}

  async getAll(currentId: number) {
    return (await this.users.find()).filter((user) => user.id !== currentId);
  }

  async getByBoard(slug: string) {
    const board = await this.boardsService.getForAccessChecks(slug);
    return this.users.findBy({ id: In(board.users.map((u) => u.id)) });
  }

  async getById(id: number) {
    const candidate = await this.users.findOneBy({ id });
    if (!candidate) {
      throw Exception.NotFound('user');
    }
    return candidate;
  }

  async create(user: UserCreateDto) {
    let { username } = user;
    const candidate = await this.users.findOneBy({ username });
    if (candidate) {
      throw Exception.Exist('user');
    }

    const avatar = await this.mediaService.load(
      `https://unavatar.io/telegram/${username}/?fallback=false`,
    );

    const password = crypto.randomUUID();

    const { id } = await this.users.save({
      username,
      avatar,
      isAdmin: !!user.isAdmin,
      name: user.name,
      password: await this.authService.hashPassword(password),
    });

    return {
      user: await this.getById(id),
      password,
    };
  }

  async createAdmin() {
    return await this.create({
      username: 'ducksnotdead',
      isAdmin: true,
      name: 'Админ',
    });
  }

  async delete(id: number) {
    const candidate = await this.users.findOneBy({ id });
    if (!candidate) {
      throw Exception.NotFound('user');
    }
    if (candidate.avatar) {
      await this.mediaService.remove(candidate.avatar);
    }
    return await this.users.remove(candidate);
  }
}

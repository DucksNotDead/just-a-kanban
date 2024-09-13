import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import genSlug from 'limax';
import {
  DeepPartial,
  EntityManager,
  FindOptionsWhere,
  In,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import { Board } from './boards.model';
import { BoardChangeUsersDto } from './dto/board-change-users-dto';
import { BoardCreateDto } from './dto/board-create-dto';
import { Exception } from '../../config/exception';
import { User } from '../users/users.model';

@Injectable()
export class BoardsService {
  constructor(
    @InjectEntityManager() private readonly manager: EntityManager,
    @InjectRepository(Board) private readonly boards: Repository<Board>,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async getAll(userId: number) {
    return this.getBoardWithUsersQB(userId).getMany();
  }

  async getBySlug(slug: string) {
    return await this.getBoardTasksProgressQB(
      this.boards
        .createQueryBuilder('board')
        .where('board.slug = :boardSlug', { boardSlug: slug })
        .loadRelationIdAndMap('board.users', 'board.users')
        .loadRelationIdAndMap('board.managers', 'board.managers'),
    ).getOne();
  }

  async getForAccessChecks(slug: string) {
    const board = await this.boards.findOne({
      where: { slug },
      relations: ['users', 'managers'],
    });
    if (!board) {
      throw Exception.NotFound('board');
    }
    const { users, managers } = board;

    return { users, managers };
  }

  async getBySlugForAccess(slug: string) {
    return await this.getBy({ slug });
  }

  async getBySprint(id: number) {
    return await this.getBy({ slices: { id } });
  }

  async getByTask(id: number) {
    return await this.getBy({ tasks: { id } });
  }

  async isBoardUser(
    boardId: number,
    userId: number,
    isManager: boolean = false,
  ) {
    return await this.boards.exists({
      where: {
        id: boardId,
        [isManager ? 'managers' : 'users']: { id: userId },
      },
    });
  }

  async create(dto: BoardCreateDto & { userId: number }) {
    const slug = this.genSlug(dto.name);

    const candidate = await this.boards.findOneBy({ slug });
    if (candidate) {
      throw Exception.Exist('board');
    }

    const { users, managers } = await this.boardUsers(
      dto.users,
      dto.managers,
      dto.userId,
    );

    const newBoard = this.boards.create({
      slug,
      users,
      managers,
      name: dto.name,
      createdBy: dto.userId,
    } as DeepPartial<Board>);
    await this.boards.save(newBoard);
    return await this.getBoardWithUsersQB()
      .where('board.id = :boardId', { boardId: newBoard.id })
      .getOne();
  }

  async changeName(slug: string, name: string) {
    const candidate = await this.boards.findOneBy({ slug });
    if (!candidate) {
      throw Exception.NotFound('board');
    }

    const anotherCandidate = await this.boards.findOneBy({ name });
    if (anotherCandidate) {
      throw Exception.Exist('board');
    }

    candidate.name = name;
    candidate.slug = this.genSlug(name);

    await this.manager.save(candidate);
    return { slug: candidate.slug };
  }

  async changeUsers(
    boardSlug: string,
    dto: BoardChangeUsersDto & { userId: number },
  ) {
    const board = await this.boards.findOne({
      where: { slug: boardSlug },
      relations: {
        users: true,
        managers: true,
      },
    });

    const { users, managers } = await this.boardUsers(
      dto.users,
      dto.managers,
      dto.userId,
    );

    board.users = users;
    board.managers = managers;

    await this.manager.save(board);
    return await this.getBySlug(boardSlug);
  }

  async delete(boardSlug: string) {
    const board = await this.boards.findOne({
      where: { slug: boardSlug },
      relations: { tasks: true, slices: true },
    });

    const id = board.id;

    await this.boards.remove(board);
    return { id };
  }

  private getBoardTasksProgressQB(qb: SelectQueryBuilder<Board>) {
    return qb
      .loadRelationCountAndMap(
        'board.doneTasksCount',
        'board.tasks',
        'doneTask',
        (qb) => {
          return qb.where('doneTask.step.id = 4');
        },
      )
      .loadRelationCountAndMap('board.tasksCount', 'board.tasks');
  }

  private getBoardWithUsersQB(userId?: number) {
    const qb = this.boards.createQueryBuilder('board');
    return this.getBoardTasksProgressQB(
      (userId
        ? qb
            .innerJoinAndSelect('board.users', 'user')
            .where('user.id = :userId', { userId })
        : qb
      )
        .innerJoinAndMapMany('board.users', 'board.users', 'allUsers')
        .loadRelationIdAndMap('board.managers', 'board.managers'),
    );
  }

  private async boardUsers(
    userIds: number[],
    managerIds: number[],
    userId: number,
  ) {
    userIds = [...userIds, userId];
    managerIds = managerIds.filter((id) => userIds.includes(id));
    const managers = await this.users.find({
      where: {
        id: In([...new Set([...managerIds, userId])]),
      },
    });
    const users = await this.users.find({
      where: {
        id: In([...new Set([...userIds, ...managerIds])]),
      },
    });
    return { managers, users };
  }

  private async getBy(
    where: FindOptionsWhere<Board>,
    loadUsers: boolean = true,
  ) {
    return await this.boards.findOne({
      where,
      relations: loadUsers ? { users: true, managers: true } : undefined,
    });
  }

  private genSlug(name: string) {
    return genSlug(name, { separator: '-', separateNumbers: true });
  }
}

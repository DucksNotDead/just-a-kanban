import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SprintUpdateDto } from './dto/sprint-update-dto';
import { Sprint } from './sprints.model';
import { Exception } from '../../config/exception';
import { Board } from '../boards/boards.model';
import { SocketService } from '../socket/socket.service';

@Injectable()
export class SprintsService {
  constructor(
    @InjectRepository(Sprint) private readonly sprints: Repository<Sprint>,
    private readonly socketService: SocketService,
  ) {}

  async getByBoard(board: Board) {
    return this.sprints.findBy({ board });
  }

  async getById(id: number) {
    const candidate = await this.sprints.findOneBy({ id });
    if (!candidate) {throw Exception.NotFound('sprint');}
    return candidate;
  }

  async create(dto: SprintUpdateDto, board: Board, userId: number) {
    const candidate = await this.sprints.findOneBy({ name: dto.name });
    if (candidate) {throw Exception.Exist('sprint');}

    const newSprint = this.sprints.create({ ...dto, board });
    await this.sprints.save(newSprint);

    this.socketService.send(
      {
        from: userId,
        event: 'sprintCreate',
        content: await this.sprints.findOneBy({ id: newSprint.id }),
      },
      board.slug,
    );
  }

  async update(
    dto: Partial<SprintUpdateDto> & { id: number },
    boardSlug: string,
    userId: number,
  ) {
    const candidate = await this.sprints.findOneBy({ id: dto.id });
    if (!candidate) {throw Exception.NotFound('sprint');}

    await this.sprints.update(dto.id, Object.assign(candidate, dto));
    this.socketService.send(
      {
        from: userId,
        event: 'sprintUpdate',
        content: await this.sprints.findOneBy({ id: dto.id }),
      },
      boardSlug,
    );
  }

  async delete(id: number, boardSlug: string, userId: number) {
    const candidate = await this.sprints.findOneBy({ id });
    if (!candidate) {throw Exception.NotFound('sprint');}

    await this.sprints.delete({ id });

    this.socketService.send(
      {
        from: userId,
        event: 'sprintDelete',
        content: { id },
      },
      boardSlug,
    );
  }
}

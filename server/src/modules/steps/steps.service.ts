import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Step } from './steps.model';
import { Exception } from '../../config/exception';
import { SocketService } from '../socket/socket.service';

@Injectable()
export class StepsService {
  constructor(
    @InjectRepository(Step) private readonly steps: Repository<Step>,
    private readonly socketService: SocketService,
  ) {}

  async get() {
    return await this.steps.find();
  }

  async getFirst() {
    return await this.getById(1);
  }

  async getById(id: number) {
    const candidate = await this.steps.findOne({
      where: { id },
      relations: ['tasks'],
    });
    if (!candidate) {
      throw Exception.NotFound('step');
    }
    return candidate;
  }

  setReorder(
    stepId: string,
    boardSlug: string,
    userId: number,
    status: 'start' | 'end',
  ) {
    this.socketService.send(
      {
        from: userId,
        event: `stepReordering${status.slice(0, 1).toUpperCase() + status.slice(1)}`,
        content: { stepId: Number(stepId) },
      },
      boardSlug,
      true,
    );
  }
}

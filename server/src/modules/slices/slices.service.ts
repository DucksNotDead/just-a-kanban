import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SliceUpdateDto } from './dto/slice-update-dto';
import { Slice } from './slices.model';
import { Exception } from '../../config/exception';
import { Board } from '../boards/boards.model';
import { SocketService } from '../socket/socket.service';

@Injectable()
export class SlicesService {
  constructor(
    @InjectRepository(Slice) private readonly slices: Repository<Slice>,
    private readonly socketService: SocketService,
  ) {}

  async getByBoard(slug: string) {
    const slices = await this.slices.find({
      relations: { board: true },
      select: { board: { slug: true } },
      where: { board: { slug } },
    });

    return slices.map(({ board, ...slice }) => slice);
  }

  async getById(id: number) {
    const candidate = await this.slices.findOneBy({ id });
    if (!candidate) {
      throw Exception.NotFound('slice');
    }
    return candidate;
  }

  async create(dto: SliceUpdateDto, board: Board, userId: number) {
    const candidate = await this.slices.findOneBy({ name: dto.name });
    if (candidate) {
      throw Exception.Exist('slice');
    }

    const newSlice = this.slices.create({ ...dto, board });
    await this.slices.save(newSlice);

    this.socketService.send(
      {
        from: userId,
        event: 'sliceCreate',
        content: await this.slices.findOneBy({ id: newSlice.id }),
      },
      board.slug,
    );
  }

  async update(
    dto: Partial<SliceUpdateDto> & { id: number },
    boardSlug: string,
    userId: number,
  ) {
    const candidate = await this.slices.findOneBy({ id: dto.id });
    if (!candidate) {
      throw Exception.NotFound('slice');
    }

    await this.slices.update(dto.id, Object.assign(candidate, dto));
    this.socketService.send(
      {
        from: userId,
        event: 'sliceUpdate',
        content: await this.slices.findOneBy({ id: dto.id }),
      },
      boardSlug,
    );
  }

  async delete(id: number, boardSlug: string, userId: number) {
    id = Number(id);
    const candidate = await this.slices.findOneBy({ id });
    if (!candidate) {
      throw Exception.NotFound('slice');
    }

    await this.slices.delete({ id });

    this.socketService.send(
      {
        from: userId,
        event: 'sliceDelete',
        content: id,
      },
      boardSlug,
    );
  }
}

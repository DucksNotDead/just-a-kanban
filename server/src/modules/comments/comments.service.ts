import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './comments.model';
import { CommentCreateDto } from './dto/comment-create-dto';
import { SocketService } from '../socket/socket.service';
import { TasksService } from '../tasks/tasks.service';
import { User } from '../users/users.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly comments: Repository<Comment>,
    private readonly tasksService: TasksService,
    private readonly socketService: SocketService,
  ) {}

  async getByTask(id: number) {
    return await this.comments.findBy({ task: { id } });
  }

  async create(
    dto: CommentCreateDto,
    taskId: number,
    user: User,
    boardSlug: string,
  ) {
    const task = await this.tasksService.getById(taskId);

    const newComment = this.comments.create({
      text: dto.text,
      task,
      user,
    });

    await this.comments.save(newComment);

    this.socketService.send({
      from: user.id,
      event: 'commentCreate',
      content: { taskId }
    }, boardSlug, task.responsible.id);
  }
}

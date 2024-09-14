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
    return await this.comments.find({
      where: { task: { id } },
      loadRelationIds: { relations: ['readBy'] },
    });
  }

  async getUnreadCount(taskId: number, userId: number) {
    const { readBy } = await this.comments.findOne({
      where: { task: { id: taskId } },
      loadRelationIds: { relations: ['readBy'] },
      select: ['task', 'readBy'],
    });
    return await this.comments
      .createQueryBuilder('comment')
      .innerJoinAndSelect('comment.user','user')
      .where(':userId != user.id AND :userId NOT IN (:...usersWhoRead)', {
        userId,
        usersWhoRead: [...readBy, -1],
      })
      .getCount();
  }

  async getLast(taskId: number) {
    return await this.comments.findOne({
      where: { task: { id: taskId }, isService: false },
      loadRelationIds: { relations: ['readBy', 'user'] },
      order: {
        date: 'DESC',
        time: 'DESC',
      },
    });
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

    this.socketService.send(
      {
        from: user.id,
        event: 'commentCreate',
        content: { taskId },
      },
      boardSlug,
      task.responsible.id,
    );
  }
}

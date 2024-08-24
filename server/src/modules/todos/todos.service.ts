import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TodoCreateDto } from './dto/todo-create-dto';
import { Todo } from './todos.model';
import { TodosModule } from './todos.module';
import { Exception } from '../../config/exception';
import { SocketService } from '../socket/socket.service';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todos: Repository<Todo>,
    @Inject(forwardRef(() => TasksService))
    private readonly tasksService: TasksService,
    private readonly socketService: SocketService,
  ) {}

  async getByTask(id: number) {
    return this.todos.findBy({ task: { id } });
  }

  async getById(id: number) {
    const candidate = await this.todos.findOneBy({ id });
    if (!candidate) {throw Exception.NotFound('todo');}
  }

  async create(
    dto: TodoCreateDto,
    taskId: number,
    boardSlug: string,
    userId: number,
  ) {
    const candidate = await this.todos.findOneBy({
      task: { id: taskId },
      label: dto.label,
    });
    if (candidate) {throw Exception.Exist('todo');}

    const task = await this.tasksService.getById(taskId);
    const newTodo = this.todos.create({
      label: dto.label,
      checked: false,
      task,
    });
    await this.todos.save(newTodo);

    this.socketService.send(
      {
        from: userId,
        event: 'todoCreate',
        content: { taskId },
      },
      boardSlug,
      task.responsible.id,
    );
  }

  async toggle(id: number, boardSlug: string, userId: number) {
    const todo = await this.getOne(id);
    const task = await this.tasksService.getById(todo.task.id);
    todo.checked = !todo.checked;
    await this.todos.update(id, todo);

    this.socketService.send(
      {
        from: userId,
        event: 'todoToggle',
        content: { id },
      },
      boardSlug,
      task.responsible.id,
    );
  }

  async delete(id: number, boardSlug: string, userId: number) {
    const todo = await this.getOne(id);
    const task = await this.tasksService.getById(todo.task.id);
    await this.todos.delete(id);
    this.socketService.send(
      {
        from: userId,
        event: 'todoDelete',
        content: { id },
      },
      boardSlug,
      task.responsible.id,
    );
  }

  async hasUnchecked(id: number) {
    return !!(await this.todos.findBy({ task: { id }, checked: false })).length;
  }

  private async getOne(id: number) {
    const candidate = await this.todos.findOne({
      where: { id },
      relations: ['task'],
    });
    if (!candidate) {throw Exception.NotFound('todo');}
    return candidate;
  }
}

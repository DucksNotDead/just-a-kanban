import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TodoChangeDto } from './dto/todo-change-dto';
import { Todo } from './todos.model';
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
    if (!candidate) {
      throw Exception.NotFound('todo');
    }
  }

  async change(
    { todos }: TodoChangeDto,
    taskId: number,
    boardSlug: string,
    userId: number,
  ) {
    const task = await this.tasksService.getById(taskId);

    const currentTodos = await this.todos.findBy({
      task: { id: taskId },
    });

    const oldTodos: Todo[] = [];
    for (const todo of todos) {
      if (!(todo instanceof Todo)) {
        const newTodo = this.todos.create({
          label: todo.label,
          checked: false,
          task,
        });
        await this.todos.save(newTodo);
      } else {
        oldTodos.push(todo);
      }
    }

    for (const currentTodo of currentTodos) {
      if (!oldTodos.find((ot) => ot.id === currentTodo.id)) {
        await this.todos.remove(currentTodo);
      }
    }

    this.socketService.send(
      {
        from: userId,
        event: 'taskTodosChange',
        content: { taskId, todos },
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
        content: { taskId: task.id, id },
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
    if (!candidate) {
      throw Exception.NotFound('todo');
    }
    return candidate;
  }
}

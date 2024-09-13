import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskCreateDto } from './dto/task-create-dto';
import { Task } from './tasks.model';
import { Exception } from '../../config/exception';
import { Board } from '../boards/boards.model';
import { SlicesService } from '../slices/slices.service';
import { SocketService } from '../socket/socket.service';
import { StepsService } from '../steps/steps.service';
import { TodosService } from '../todos/todos.service';
import { User } from '../users/users.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasks: Repository<Task>,
    private readonly usersService: UsersService,
    private readonly slicesService: SlicesService,
    private readonly stepsService: StepsService,
    private readonly todosService: TodosService,
    private readonly socketService: SocketService,
  ) {}

  async getByUserBoard(board: Board, user: User) {
    /*return await this.tasks.find({
      where: board.managers.find((m) => m.id === user.id)
        ? { board: { id: board.id } }
        : { board: { id: board.id }, responsible: { id: user.id } },
      loadRelationIds: true,
    });*/
    const isManager = board.managers.find((m) => m.id === user.id);
    return this.tasks
      .createQueryBuilder('task')
      .innerJoinAndSelect('task.board', 'board')
      .innerJoinAndSelect('task.responsible', 'responsible')
      .where('board.id = :boardId', { boardId: board.id })
      .where(!isManager ? 'responsible.id = :responsibleId' : 'TRUE', {
        responsibleId: user.id,
      })
      .loadRelationCountAndMap('task.todosCount', 'task.todos')
      .loadRelationCountAndMap(
        'task.doneTodosCount',
        'task.todos',
        'doneTodo',
        (qb) => {
          return qb.where('doneTodo.checked = TRUE');
        },
      )
      .loadAllRelationIds()
      .getMany();
  }

  async getForTaskAccess(id: number) {
    const candidate = await this.tasks.findOne({
      where: { id },
      relations: ['responsible', 'step', 'reviewer'],
    });
    if (!candidate) {
      throw Exception.NotFound('task');
    }
    const { responsible, reviewer, step } = candidate;
    return { responsible, reviewer, step };
  }

  async getById(id: number) {
    const candidate = await this.tasks.findOne({
      where: { id },
      relations: ['responsible'],
    });
    if (!candidate) {
      throw Exception.NotFound('task');
    }
    return candidate;
  }

  async create(dto: TaskCreateDto & { board: Board }, userId: number) {
    const candidate = await this.tasks.findOneBy({ title: dto.title });
    if (candidate) {
      throw Exception.Exist('task');
    }

    const responsible = await this.usersService.getById(dto.responsible);

    const slice = await this.slicesService.getById(dto.slice);

    const step = await this.stepsService.getFirst();
    const boardTasks = await this.getByBoard(dto.board);

    for (const boardTask of boardTasks) {
      boardTask.order++;
      await this.tasks.save(boardTask);
    }

    const newTask = this.tasks.create({
      ...dto,
      step,
      slice,
      responsible,
      order: 1,
      created: this.getCurrentDate(),
      updated: this.getCurrentDate(),
      starts: dto.starts ?? null,
    });

    await this.tasks.save(newTask);

    this.socketService.send(
      {
        from: userId,
        event: 'taskCreate',
        content: await this.tasks.findOne({
          where: { id: newTask.id },
          loadRelationIds: true,
        }),
      },
      dto.board.slug,
      responsible.id,
    );

    return newTask.id;
  }

  async changeOrder(to: number, id: number, board: Board, userId: number) {
    to = Number(to);

    const task = await this.tasks.findOne({
      where: { id },
      relations: ['step', 'responsible'],
    });

    const boardTasks = await this.getByBoard(board);

    if (to > boardTasks.length - 1) {
      throw Exception.BadRequest('order > step tasks count');
    }

    const from = task.order;
    if (to === from) {
      throw Exception.BadRequest('orders the same');
    }

    const [implementer, min, max] = from < to ? [-1, from, to] : [1, to, from];

    const updatedTasks = boardTasks
      .filter(({ order, id }) => {
        return order >= min && order <= max && id !== task.id;
      })
      .map((task) => ({
        ...task,
        order: task.order + implementer,
      }));

    task.order = to;

    for (const { id: updatedId, ...updatedTask } of [task, ...updatedTasks]) {
      this.update({ ...updatedTask, id: updatedId });
      await this.tasks.update(updatedId, updatedTask);
    }

    if (to !== -1) {
      this.socketService.send(
        {
          from: userId,
          event: 'taskOrderChange',
          content: [task, ...updatedTasks].map((t) => ({
            taskId: t.id,
            order: t.order,
          })),
        },
        board.slug,
      );
    }
  }

  async setReviewer(user: User, id: number, boardSlug: string) {
    const task = await this.tasks.findOne({
      where: { id },
      relations: ['reviewer', 'step', 'responsible'],
    });
    if (!task) {
      throw Exception.NotFound('task');
    }
    if (task.step.id !== 3) {
      throw Exception.BadRequest('Только для задач на проверке');
    }
    if (task.reviewer && task.reviewer.id === user.id) {
      task.reviewer = null;
    } else {
      task.reviewer = user;
    }
    this.update(task);
    await this.tasks.update(id, task);

    this.socketService.send(
      {
        from: user.id,
        event: 'taskReviewerSet',
        content: { taskId: task.id, reviewer: task.reviewer?.id ?? null },
      },
      boardSlug,
      task.responsible.id,
    );
  }

  async setReplacer(user: User, id: number, boardSlug: string) {
    const task = await this.tasks.findOne({
      where: { id },
      relations: ['responsible', 'replacer'],
    });

    if (!task) {
      throw Exception.NotFound('task');
    }

    if (task.replacer) {
      task.replacer = null;
    } else {
      task.replacer = user;
    }

    this.update(task);
    await this.tasks.update(id, task);

    this.socketService.send(
      {
        from: user.id,
        event: 'taskReplacerSet',
        content: { taskId: task.id, isReplacing: !!task.replacer },
      },
      boardSlug,
      task.responsible.id,
    );
  }

  async responsibleChangeStep(
    to: number,
    id: number,
    boardSlug: string,
    userId: number,
  ) {
    to = Number(to);
    const task = await this.getTaskForChangeStep(id, to);
    if (![1, 2, 3].includes(to)) {
      throw Exception.AccessDenied();
    }

    if (to === 2 && (await this.todosService.hasUnchecked(id))) {
      throw Exception.BadRequest('task undone');
    }
    await this.changeStep(to, task, boardSlug, userId);
  }

  async managerChangeStep(
    to: number,
    id: number,
    user: User,
    boardSlug: string,
  ) {
    to = Number(to);
    const task = await this.getTaskForChangeStep(id, to, true);
    if (![1, 3, 4].includes(to)) {
      throw Exception.AccessDenied();
    }

    if (to === 4 && !task.reviewer) {
      throw Exception.NotFound('reviewer');
    }
    if (to === 1) {
      const todos = await this.todosService.getByTask(task.id);
      if (todos.length && !(await this.todosService.hasUnchecked(id))) {
        throw Exception.NotFound('unchecked todos');
      }
      if (task.reviewer) {
        task.reviewer = null;
      }
    }
    await this.changeStep(to, task, boardSlug, user.id);
  }

  async changeMeta(
    dto: Partial<TaskCreateDto>,
    id: number,
    boardSlug: string,
    userId: number,
  ) {
    const task = await this.tasks.findOne({
      where: { id },
      relations: ['responsible', 'slice'],
    });
    if (!task) {
      throw Exception.NotFound('task');
    }
    const { responsible, slice } = dto;

    if (responsible) {
      task.responsible = await this.usersService.getById(responsible);
    }

    if (slice) {
      task.slice = await this.slicesService.getById(slice);
    }

    this.update(task);
    await this.tasks.update(id, Object.assign(task, dto));

    this.socketService.send(
      {
        from: userId,
        event: 'taskMetaChange',
        content: await this.getForResponse(task.id),
      },
      boardSlug,
      task.responsible.id ?? undefined,
    );
  }

  private async getForResponse(id: number) {
    return await this.tasks.findOne({
      where: { id },
      loadRelationIds: true,
    });
  }

  async delete(id: number, board: Board, userId: number) {
    const task = await this.tasks.findOne({
      where: { id },
      relations: ['responsible'],
    });
    if (!task) {
      throw Exception.NotFound('task');
    }

    await this.changeOrder(-1, id, board, userId);

    await this.tasks.remove(task);
    this.socketService.send(
      {
        from: userId,
        event: 'taskDelete',
        content: id,
      },
      board.slug,
      task.responsible.id,
    );
  }

  private async getByBoard(board: Board) {
    return await this.tasks.find({
      where: { board },
    });
  }

  private getCurrentDate(): string {
    function format(item: string | number): string {
      return item.toString().padStart(2, '0');
    }

    const d = new Date();
    const date = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
      .map(format)
      .join('-');
    const time = [d.getHours(), d.getMinutes()].map(format).join(':');
    return date + 'T' + time;
  }

  private async getTaskForChangeStep(
    id: number,
    to: number,
    reviewer?: boolean,
  ) {
    const task = await this.tasks.findOne({
      where: { id },
      relations: reviewer ? ['step', 'reviewer'] : ['step'],
    });
    if (!task) {
      throw Exception.NotFound('task');
    }
    if (task.step.id === to) {
      throw Exception.BadRequest('step === prev step');
    }
    return task;
  }

  private async changeStep(
    to: number,
    task: Task,
    boardSlug: string,
    userId: number,
  ) {
    const step = await this.stepsService.getById(to);
    if (!step) {
      throw Exception.NotFound('step');
    }

    task.step = step;
    this.update(task);
    await this.tasks.save(task);

    this.socketService.send(
      {
        from: task.responsible.id,
        event: 'taskChangeStep',
        content: { taskId: task.id, step: to },
      },
      boardSlug,
      userId,
    );
  }

  private update(task: Task): void {
    task.updated = this.getCurrentDate();
  }
}

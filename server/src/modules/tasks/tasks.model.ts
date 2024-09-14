import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DATA_DATE, DATA_HIDDEN, DATA_STRING } from '../../config/db';
import { ApiField } from '../../config/swagger';
import { Board } from '../boards/boards.model';
import { Comment } from '../comments/comments.model';
import { Slice } from '../slices/slices.model';
import { Step } from '../steps/steps.model';
import { Todo } from '../todos/todos.model';
import { User } from '../users/users.model';

@Entity()
export class Task {
  @ApiField('ID')
  @PrimaryGeneratedColumn()
  id: number;

  @ApiField('TASK_TITLE')
  @Column({ ...DATA_STRING, unique: true })
  title: string;

  @ApiField('ORDER')
  @Column()
  order: number;

  @ApiField('DATE')
  @Column(DATA_DATE)
  created: string;

  @ApiField('DATE')
  @Column(DATA_DATE)
  updated: string;

  @ApiField('DATE')
  @Column({ ...DATA_DATE, nullable: true })
  starts: string;

  @ApiField('DATE')
  @Column({ ...DATA_DATE })
  deadline: string;

  @OneToMany(() => Todo, (todo) => todo.task)
  todos: Todo[];

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'CASCADE',
  })
  responsible: User;

  @OneToOne(() => User, (user) => user.reviewTask, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  reviewer: User;

  @ManyToOne(() => Slice, (slice) => slice.tasks, {
    onDelete: 'SET NULL',
  })
  slice: Slice;

  @ManyToOne(() => Step, (step) => step.tasks, { nullable: false })
  step: Step;

  @ManyToOne(() => Board, (board) => board.tasks, {
    onDelete: 'CASCADE',
  })
  board: Board;

  @Column(DATA_HIDDEN)
  todosCount: number;

  @Column(DATA_HIDDEN)
  doneTodosCount: number;
}

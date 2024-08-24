import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DATA_BIG_STRING, DATA_DATE, DATA_JSON } from '../../config/db';
import { ApiField } from '../../config/swagger';
import { Board } from '../boards/boards.model';
import { Comment } from '../comments/comments.model';
import { Sprint } from '../sprints/sprints.model';
import { Step } from '../steps/steps.model';
import { Todo } from '../todos/todos.model';
import { User } from '../users/users.model';

@Entity()
export class Task {
  @ApiField('ID')
  @PrimaryGeneratedColumn()
  id: number;

  @ApiField('TASK_TITLE')
  @Column({ ...DATA_BIG_STRING, unique: true })
  title: string;

  @ApiField('TASK_ORDER')
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
    onDelete: 'SET NULL',
    nullable: true,
  })
  responsible: User;

  @OneToOne(() => User, (user) => user.reviewTask, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  reviewer: User;

  @ManyToOne(() => Sprint, (sprint) => sprint.tasks, {
    cascade: true,
    nullable: false,
  })
  sprint: Sprint;

  @ManyToOne(() => Step, (step) => step.tasks, { nullable: false })
  step: Step;

  @ManyToOne(() => Board, (board) => board.tasks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  board: Board;
}

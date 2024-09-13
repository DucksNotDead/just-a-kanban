import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DATA_HIDDEN, DATA_STRING } from '../../config/db';
import { ApiField } from '../../config/swagger';
import { Slice } from '../slices/slices.model';
import { Task } from '../tasks/tasks.model';
import { User } from '../users/users.model';

@Entity()
export class Board {
  @ApiField('ID')
  @PrimaryGeneratedColumn()
  id: number;

  @ApiField('BOARD_SLUG')
  @Column({ ...DATA_STRING, unique: true })
  slug: string;

  @ApiField('BOARD_NAME')
  @Column({ ...DATA_STRING })
  name: string;

  @ManyToMany(() => User, (user) => user.boards)
  @JoinTable()
  users: User[];

  @ManyToMany(() => User, (user) => user.manageBoards)
  @JoinTable()
  managers: User[];

  @ManyToOne(() => User, (user) => user.createdBoards)
  createdBy: User;

  @OneToMany(() => Task, (task) => task.board)
  tasks: Task[];

  @OneToMany(() => Slice, (slice) => slice.board)
  slices: Slice[];

  @Column(DATA_HIDDEN)
  tasksCount: number;

  @Column(DATA_HIDDEN)
  doneTasksCount: number;
}

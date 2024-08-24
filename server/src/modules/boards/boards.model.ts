import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DATA_STRING } from '../../config/db';
import { ApiField } from '../../config/swagger';
import { Sprint } from '../sprints/sprints.model';
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

  @ManyToMany(() => User, (user) => user.boards, { cascade: true })
  @JoinTable()
  users: User[];

  @ManyToMany(() => User, (user) => user.manageBoards, { cascade: true })
  @JoinTable()
  managers: User[];

  @ManyToOne(() => User, (user) => user.createdBoards, {
    cascade: true,
    nullable: false,
  })
  createdBy: User;

  @OneToMany(() => Task, (task) => task.board)
  tasks: Task[];

  @OneToMany(() => Sprint, (sprint) => sprint.board, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  sprints: Sprint[];
}

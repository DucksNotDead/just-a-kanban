import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DATA_DATE_WITHOUT_TIME, DATA_TEXT, DATA_TIME } from '../../config/db';
import { ApiField } from '../../config/swagger';
import { Task } from '../tasks/tasks.model';
import { User } from '../users/users.model';

@Entity()
export class Comment {
  @ApiField('ID')
  @PrimaryGeneratedColumn()
  id: number;

  @ApiField('COMMENT_TEXT')
  @Column(DATA_TEXT)
  text: string;

  @ApiField('DATE_WITHOUT_TIME')
  @Column(DATA_DATE_WITHOUT_TIME)
  date: string;

  @ApiField('TIME')
  @Column(DATA_TIME)
  time: string;

  @ApiField('BOOLEAN')
  @Column({ default: false })
  isService: boolean;

  @ApiField('IDS')
  @ManyToMany(() => User, (user) => user.readComments)
  @JoinTable()
  readBy: User[];

  @ManyToOne(() => Task, (task) => task.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  task: Task;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'SET NULL',
  })
  user: User;
}

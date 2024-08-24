import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DATA_TEXT } from '../../config/db';
import { ApiField } from "../../config/swagger";
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

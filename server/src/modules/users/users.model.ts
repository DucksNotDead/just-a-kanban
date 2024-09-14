import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DATA_STRING } from '../../config/db';
import { ApiField } from '../../config/swagger';
import { Board } from '../boards/boards.model';
import { Comment } from '../comments/comments.model';
import { Task } from '../tasks/tasks.model';

@Entity()
export class User {
  @ApiField('ID')
  @PrimaryGeneratedColumn()
  id: number;

  @ApiField('USERNAME')
  @Column({ ...DATA_STRING, unique: true })
  username: string;

  @ApiField('NAME')
  @Column(DATA_STRING)
  name: string;

  @ApiField('PASSWORD')
  @Column({ select: false })
  password: string;

  @ApiField('BOOLEAN')
  @Column()
  isAdmin: boolean;

  @ApiField('ID')
  @Column({ nullable: true })
  avatar: number;

  @OneToMany(() => Task, (task) => task.responsible)
  tasks: Task[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToMany(() => Comment, comment => comment.readBy)
  readComments: Comment[]

  @OneToMany(() => Board, (board) => board.createdBy)
  createdBoards: Board[];

  @ManyToMany(() => Board, (board) => board.managers)
  manageBoards: Board[];

  @OneToOne(() => Task, (task) => task.reviewer, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  reviewTask: Task;

  @ManyToMany(() => Board, (board) => board.users)
  boards: Board[];
}

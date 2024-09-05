import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DATA_COLOR, DATA_STRING } from '../../config/db';
import { ApiField } from '../../config/swagger';
import { Board } from '../boards/boards.model';
import { Task } from '../tasks/tasks.model';

@Entity()
export class Slice {
  @ApiField('ID')
  @PrimaryGeneratedColumn()
  id: number;

  @ApiField('SLICE_NAME')
  @Column(DATA_STRING)
  name: string;

  @ApiField('COLOR')
  @Column(DATA_COLOR)
  color: string;

  @OneToMany(() => Task, (task) => task.slice, { onDelete: 'SET NULL' })
  tasks: Task[];

  @ManyToOne(() => Board, (board) => board.slices, { nullable: true, onDelete: 'CASCADE' })
  board: Board;
}

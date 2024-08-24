import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DATA_STRING } from '../../config/db';
import { ApiField } from '../../config/swagger';
import { Task } from '../tasks/tasks.model';

@Entity()
export class Todo {
  @ApiField('ID')
  @PrimaryGeneratedColumn()
  id: number;

  @ApiField('TODO_LABEL')
  @Column(DATA_STRING)
  label: string;

  @ApiField('BOOLEAN')
  @Column({ default: false })
  checked: boolean;

  @ManyToOne(() => Task, (task) => task.todos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  task: Task;
}

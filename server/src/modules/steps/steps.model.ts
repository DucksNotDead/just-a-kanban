import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { DATA_STRING } from "../../config/db";
import { ApiField } from "../../config/swagger";
import { Task } from "../tasks/tasks.model";

@Entity()
export class Step {
  @ApiField('BOARD_SLUG')
  @PrimaryGeneratedColumn()
  id: number;

  @ApiField('STEP_NAME')
  @Column(DATA_STRING)
  name: string;

  @ApiField('STEP_LABEL')
  @Column(DATA_STRING)
  label: string;

  @OneToMany(() => Task, (task) => task.step, {})
  tasks: Task[];
}

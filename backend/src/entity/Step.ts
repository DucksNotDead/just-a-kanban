import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task";

@Entity()
export class Step {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  icon: string

  @OneToMany(() => Task, task => task.step, {})
  tasks: Task[]

}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Category } from "./Category";
import { Task } from "./Task";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({ nullable: true })
    name: string

    @Column()
    password: string

    @OneToMany(() => Task, task => task.user)
    tasks: Task[]

    @OneToMany(() => Category, category => category.user)
    categories: Category[]

}

import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Task } from "./Task";

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	color: string;

	@ManyToOne(() => User, (user) => user.categories, {
		onDelete: "CASCADE",
	})
	user: User;

	@OneToMany(() => Task, (task) => task.category)
	tasks: Task[];
}

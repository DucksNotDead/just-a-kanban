import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Step } from "./Step";
import { User } from "./User";

@Entity()
export class Task {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column("json")
	body: object;

	@Column({ length: 20, nullable: true })
	starts: string;

	@Column({ length: 20, nullable: true })
	deadline: string;

	@ManyToOne(() => User, (user) => user.tasks, {
		cascade: true,
		onDelete: "CASCADE",
	})
	user: User;

	@ManyToOne(() => Category, (category) => category.tasks, {
		onDelete: "SET NULL",
	})
	category: Category;

	@ManyToOne(() => Step, (step) => step.tasks)
	step: Step;

	@Column({ nullable: true })
	stepReason: string;
}

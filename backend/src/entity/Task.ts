import {
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';
import { Step } from './Step';
import { User } from './User';

const dateLength = { length: 20 };

@Entity()
export class Task {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column({ nullable: true })
	description: string;

	@Column({ nullable: true })
	preview: string;

	@Column({ type: 'json', nullable: true })
	body: object;

	@Column(dateLength)
	created: string;

	@Column(dateLength)
	updated: string;

	@Column({ ...dateLength, nullable: true })
	starts: string;

	@Column({ ...dateLength, nullable: true })
	deadline: string;

	@ManyToOne(() => User, (user) => user.tasks, {
		cascade: true,
		onDelete: 'CASCADE',
	})
	user: User;

	@ManyToOne(() => Category, (category) => category.tasks, {
		onDelete: 'SET NULL',
	})
	category: Category;

	@ManyToOne(() => Step, (step) => step.tasks)
	step: Step;

	@Column({ nullable: true })
	stepReason: string;

	@Column({ default: false })
	inBasket: boolean;

	@Column({ default: false })
	highPriority: boolean;
}

import { IStep } from 'entities/Step';
import { ICategory } from 'entities/Category';

export interface ITaskMeta {
	starts?: string;
	deadline?: string;
	category?: ICategory;
	highPriority?: boolean
}

export interface ITaskTodo {
	key: string;
	label: string;
	checked: boolean;
}

export interface ITask extends ITaskMeta{
	id: number;
	title: string;
	description?: string;
	preview?: string;
	step?: IStep;
	stepReason?: string;
	inBasket: boolean;
	updated: string;
}

export interface ITaskBody {
	body: {
		todos: ITaskTodo[],
	};
	created: string;
}

export type ITaskFull = ITask & ITaskBody;

export interface ITaskRequest
	extends Omit<
		ITaskFull,
		'id' | 'created' | 'updated' | 'step' | 'category'
	> {
	category: number;
}

export interface ITaskCard {
	task: ITask;
	hidden: boolean;
	picked: boolean;
	pending: 'creating' | 'removing' | null;
}

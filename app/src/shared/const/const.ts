import { ITaskFull } from 'entities/Task';

export const emptyTask = ({
	id,
	title,
	step,
}: {
	id: number;
	step?: ITaskFull['step'];
	title?: string;
}): ITaskFull => ({
	id,
	title: title ?? '',
	body: {
		todos: [{ key: 'todo' + id, label: '', checked: false }],
	},
	step: step,
	inBasket: false,
	created: '',
	updated: '',
	highPriority: false,
});

import { ITaskTodo } from 'entities/Task';

export interface ITodoListProps {
	items: ITaskTodo[];
	setItems: (items: ITaskTodo[]) => void;
	editMode?: boolean;
}

export interface ITodoListInstance
	extends Omit<ITodoListProps, 'editMode'> {}

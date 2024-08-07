import { ITask, ITaskFull } from 'entities/Task';
import { Dispatch, SetStateAction, MouseEvent } from 'react';

export interface ITaskModalRef {
	open: (task: ITask | 'create') => void;
}

export interface ITaskModalProps {
	onClose?: (task: ITaskFull | null) => void;
}

export interface ITaskModalInstance {
	open: boolean;
	mode: 'create' | 'edit' | null;
	toViewMode: () => void;
	toEditMode: () => void;
	loading: boolean;
	handleCancel: () => void;
	task: ITaskFull | null;
	setTask: Dispatch<SetStateAction<ITaskFull|null>>;
}

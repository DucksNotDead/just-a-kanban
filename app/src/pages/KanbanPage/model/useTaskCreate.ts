import { RefObject, useCallback } from 'react';
import { ITaskModalRef } from 'widgets/TaskModal';
import { ITaskFull } from 'entities/Task';

export function useTaskCreate(taskModal: RefObject<ITaskModalRef>) {
	const handleAddButtonClick = useCallback(() => {
		taskModal.current?.open('create')
	}, [taskModal.current]);

	const handleSave = useCallback((task: ITaskFull) => {
		console.log(task);
	}, []);

	return { handleAddButtonClick, handleSave }
}
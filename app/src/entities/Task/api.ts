import { useConnect } from 'shared/lib/useConnect';
import { useCallback, useEffect, useState } from 'react';
import { ITask, ITaskBody, ITaskFull, ITaskRequest } from './types';

export function useTasks() {
	const connect = useConnect();
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [tasksPending, setTasksPending] = useState(true);

	const getTasks = useCallback(() => {
		setTasksPending(() => true);
		connect<ITask[]>('/tasks')
			.then((response) => {
				if (response) {
					setTasks(() => response.data);
				}
			})
			.finally(() => setTasksPending(() => false));
	}, []);

	const getTaskBody = useCallback(async (id: number) => {
		return await connect<ITaskBody>('/task-body', 'get', { id })
	}, []);

	const moveTask = useCallback(
		async (id: number, stepId: number) => {
			return await connect<ITask>('/task-move', 'put', {
				id,
				stepId,
			});
		},
		[],
	);

	const createTask = useCallback(async (task: ITaskRequest) => {
		await connect<ITaskFull>('/tasks', 'post', {
			...task,
		});
	}, []);

	const removeTask = useCallback(async (id: number) => {
		return await connect<number>('/tasks', 'delete', { id });
	}, []);

	useEffect(() => {
		getTasks();
	}, []);

	return {
		tasks,
		setTasks,
		tasksPending,
		getTaskBody,
		moveTask,
		createTask,
		removeTask,
	};
}

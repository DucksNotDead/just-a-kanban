import { useCallback, useEffect, useState } from 'react';
import { ITask } from 'constants/Models';
import { useConnect } from './useConnect';

export function useTasks() {
	const connect = useConnect();
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [tasksPending, setTasksPending] = useState(true);
	const [feed, setFeed] = useState(Math.random);

	const updateTaskList = useCallback(() => {
		setFeed((prevState) => prevState++);
	}, [feed]);

	const getTasks = useCallback(() => {
		setTasksPending(() => true);
		connect<{ tasks: ITask[] }>('/tasks')
			.then((response) => {
				if (response) {
					setTasks(() => response.tasks);
				}
			})
			.finally(() => setTasksPending(() => false));
	}, []);

	const moveTask = useCallback(
		async (id: number, step: number) =>
			await connect<ITask>('/task-move', 'put', {
				id,
				step,
			}),
		[],
	);

	useEffect(() => {
		getTasks();
	}, [feed]);

	return { tasks, tasksPending, moveTask };
}

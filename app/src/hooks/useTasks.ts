import { useEffect, useState } from 'react';
import { ITask } from 'constants/Models';
import { useConnect } from './useConnect';

export function useTasks() {
	const connect = useConnect()
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [tasksPending, setTasksPending] = useState(true);

	useEffect(() => {
		connect<{ tasks: ITask[] }>("/tasks")
			.then(response => {
				if (response) {
					setTasks(() => response.tasks)
				}
			})
			.finally(() => setTasksPending(() => false))
	}, []);

	return { tasks, tasksPending }
}
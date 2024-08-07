import { useCallback, useEffect, useState } from 'react';
import { ITask, ITaskFull, ITaskCard } from 'entities/Task';
import { emptyTask, TAppResponse } from 'shared';

export function useTaskCards(tasks: ITask[]) {
	const [taskCards, setTaskCards] = useState<ITaskCard[]>([]);

	const inStep = useCallback(
		(id: number): ITaskCard[] => {
			return taskCards.filter(
				(card) => !card.task.inBasket && card.task.step?.id === id,
			);
		},
		[taskCards],
	);

	const set = useCallback(
		(
			id: number,
			key: keyof Omit<ITaskCard, 'task'>,
			value: Omit<ITaskCard, 'task'>[keyof Omit<ITaskCard, 'task'>],
		) =>
			setTaskCards((prevState) => {
				const item =
					prevState[
						prevState.findIndex(
							(card) => card.task.inBasket && card.task.id === id,
						)
					];
				if (item) item[key] = value as keyof (typeof item)[typeof key];
				return prevState;
			}),
		[],
	);

	const create = useCallback(
		(
			step: ITask['step'],
			promiseFn: () => Promise<TAppResponse<ITaskFull>>,
		) => {
			const id = Date.now()
			setTaskCards((prevState) => {
				const item: ITaskCard = {
					task: emptyTask({ id, step }),
					hidden: false,
					picked: false,
					pending: 'creating',
				};
				return [...prevState, item];
			});
			promiseFn().then(createdTask => {
				setTimeout(() => set(id, 'pending', null), 150)
			});
		},
		[set],
	);

	useEffect(() => {
		setTaskCards(() =>
			tasks.map((task) => ({
				task,
				hidden: false,
				picked: false,
				pending: null,
			})),
		);
	}, [tasks]);

	return {
		inStep,
		create,
		pick: (id: number) => set(id, 'picked', true),
		drop: (id: number) => set(id, 'picked', false),
		hide: (id: number) => set(id, 'hidden', true),
		show: (id: number) => set(id, 'hidden', false),
	};
}

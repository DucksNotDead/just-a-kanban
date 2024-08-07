import {
	ForwardedRef,
	useCallback,
	useImperativeHandle,
	useState,
} from 'react';
import { ITaskFull, useTasks } from 'entities/Task';
import {
	ITaskModalInstance,
	ITaskModalProps,
	ITaskModalRef,
} from '../model/types';
import { emptyTask } from 'shared';

export function useTaskModal(
	props: ITaskModalProps,
	ref: ForwardedRef<ITaskModalRef>,
): ITaskModalInstance {
	const { getTaskBody } = useTasks();
	const [task, setTask] = useState<ITaskFull | null>(null);
	const [mode, setMode] = useState<'edit' | 'create' | null>(null);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const openModal = useCallback<ITaskModalRef['open']>(
		(task) => {
			setOpen(true);
			if (task === 'create') {
				const timestamp = Date.now();
				setTask(() =>
					emptyTask({
						id: timestamp,
						title: 'Задача #' + timestamp.toString().slice(8, 13),
					}),
				);
				setTimeout(() => setMode('create'), 100);
			} else {
				setLoading(true);
				getTaskBody(task.id).then((res) => {
					if (res) {
						setTask(() => ({ ...task, ...res.data }));
					}
					setTimeout(() => setLoading(false), 500);
				});
			}
		},
		[task],
	);

	const toViewMode = useCallback(() => setMode(null), []);

	const toEditMode = useCallback(() => setMode('edit'), []);

	const handleCancel = useCallback(() => {
		if (task) {
			props.onClose && props.onClose(task);
		}
		setMode(null)
		setOpen(() => false);
	}, [task]);

	useImperativeHandle(ref, () => ({
		open: openModal,
	}));

	return { open, mode, toViewMode, toEditMode, loading, handleCancel, task, setTask };
}

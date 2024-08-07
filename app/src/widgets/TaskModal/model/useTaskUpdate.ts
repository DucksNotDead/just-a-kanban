import { ITaskFull, ITaskMeta } from 'entities/Task';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export function useTaskUpdate(
	task: ITaskFull | null,
	setTask: Dispatch<SetStateAction<ITaskFull | null>>,
) {
	const [saving, setSaving] = useState(false);

	const updateTitle = useCallback((value: string) => {
		setTask((prevState) =>
			prevState ? { ...prevState, title: value } : null,
		);
	}, []);

	const updateBody = useCallback((body: ITaskFull['body']) => {
		setTask((prevState) => (prevState ? { ...prevState, body } : null));
	}, [setTask]);

	const updateMeta = useCallback((meta: ITaskMeta) => {
		setTask((prevState) => {
			return prevState ? { ...prevState, ...meta } : null;
		});
	}, []);

	const handleSave = useCallback(() => {
		setSaving(true);
		setTimeout(() => setSaving(false), 1000);
	}, [task]);

	return { updateTitle, updateBody, updateMeta, handleSave, saving };
}

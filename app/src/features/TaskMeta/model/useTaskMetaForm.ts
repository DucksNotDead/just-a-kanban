import { useForm, useWatch } from 'antd/es/form/Form';
import { ITaskMetaFormFields } from './types';
import { useEffect } from 'react';
import { Dayjs } from 'dayjs';
import { ITaskMeta } from 'entities/Task';

function dateParse(date?: Dayjs) {
	return date?.format('YYYY.MM.DD');
}

export function useTaskMetaForm(onChange: (meta: ITaskMeta) => void) {
	const [form] = useForm<ITaskMetaFormFields>();

	const allFields = useWatch([], form);

	useEffect(() => {
		if (allFields) {
			onChange({
				...allFields,
				starts: dateParse(allFields.starts),
				deadline: dateParse(allFields.deadline),
			});
		}
	}, [allFields]);

	return { form };
}

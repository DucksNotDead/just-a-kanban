import { useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'antd/es/form/Form';
import { IUserCredits } from 'entities/User';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

export function useLoginForm(submitCallback: (fieldValues: IUserCredits) => void) {
	const [regMode, setRegMode] = useState(false);
	const [validated, setValidated] = useState(false);
	const [form] = useForm<IUserCredits>();
	const allFields = useWatch([], form);

	const handleCheckboxChange = useCallback((e: CheckboxChangeEvent) => {
		setRegMode(() => e.target.checked);
	}, []);

	const handleSubmit = useCallback(() => {
		submitCallback(form.getFieldsValue());
	}, []);

	useEffect(() => {
		if (form) {
			form
				.validateFields({ validateOnly: true })
				.then(() => setValidated(() => true))
				.catch(() => setValidated(() => false));
		}
	}, [form, allFields, regMode]);

	return { form, regMode, validated, handleSubmit, handleCheckboxChange }
}
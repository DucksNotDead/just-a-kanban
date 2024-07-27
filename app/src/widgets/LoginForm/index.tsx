import {
	Button,
	Checkbox,
	Flex,
	Form,
	Input,
	Space,
} from 'antd';
import { Title } from 'entities/Title';
import { useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'antd/es/form/Form';
import { formFields, validator } from './config';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { IUserCredits } from 'constants/Types';
import Styles from './style.module.scss';

export interface IProps {
	onSubmit: (credits: IUserCredits) => void;
	pending: boolean;
	success: boolean;
}

export function LoginForm(props: IProps) {
	const [regMode, setRegMode] = useState(false);
	const [validated, setValidated] = useState(false);
	const [form] = useForm<IUserCredits>();
	const allFields = useWatch([], form);

	const handleCheckboxChange = useCallback(
		(e: CheckboxChangeEvent) => {
			setRegMode(() => e.target.checked);
		},
		[],
	);

	const handleSubmit = useCallback(() => {
		props.onSubmit(form.getFieldsValue());
	}, []);

	useEffect(() => {
		if (form) {
			form
				.validateFields({ validateOnly: true })
				.then(() => setValidated(() => true))
				.catch(() => setValidated(() => false));
		}
	}, [form, allFields, regMode]);

	return (
		<Flex
			vertical
			align={'center'}
			className={`${Styles.Container} ${props.success? Styles.LoginSuccess : ''}`}
		>
			<Title main>вход</Title>
			<Form form={form} className={Styles.Form}>
				{formFields(regMode).map((field) =>
					field.hidden ? null : (
						<Form.Item
							key={field.name}
							name={field.name}
							rules={validator(field.name === 'password')}
						>
							<Input placeholder={field.label} type={field.name}/>
						</Form.Item>
					),
				)}
				<Space>
					<Button
						disabled={!validated}
						type={'primary'}
						onClick={handleSubmit}
						loading={props.pending}
					>
						{regMode ? 'зарегистрироваться' : 'войти'}
					</Button>
					<Checkbox onChange={handleCheckboxChange}>
						я новенький
					</Checkbox>
				</Space>
			</Form>
		</Flex>
	);
}

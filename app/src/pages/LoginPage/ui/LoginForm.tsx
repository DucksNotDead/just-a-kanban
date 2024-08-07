import Styles from './LoginForm.module.scss';
import { Button, Checkbox, Flex, Form, Input, Space } from 'antd';
import { Title } from 'shared';
import { formFields, validator } from '../config/loginFormConfig';
import { IUserCredits } from 'entities/User';
import { useLoginForm } from '../model/useLoginForm';

export interface IProps {
	onSubmit: (credits: IUserCredits) => void;
	pending: boolean;
	success: boolean;
}

export function LoginForm(props: IProps) {
	const { form, regMode, validated, handleSubmit, handleCheckboxChange } =
		useLoginForm(props.onSubmit);

	return (
		<Flex
			vertical
			align={'center'}
			className={`${Styles.Container} ${props.success ? Styles.LoginSuccess : ''}`}
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
							<Input placeholder={field.label} type={field.name} />
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
					<Checkbox onChange={handleCheckboxChange}>я новенький</Checkbox>
				</Space>
			</Form>
		</Flex>
	);
}

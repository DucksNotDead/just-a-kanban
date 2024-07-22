import { RuleObject, RuleRender } from 'antd/es/form';
import { IUserCredits } from 'constants/Types';

type Rule = RuleObject | RuleRender;

export type TForm = {
	[P in IUserCredits as string]: string;
};

interface IFormField<T> {
	name: keyof T;
	label: string;
	hidden?: boolean;
}

export const formFields = (
	regMode: boolean,
): IFormField<IUserCredits>[] => [
	{ name: 'username', label: 'юзернэйм' },
	{ name: 'name', hidden: !regMode, label: 'ваше имя' },
	{ name: 'password', label: 'пароль' },
];

const commonRules: Rule[] = [
	{
		required: true,
		message: 'обязательно для заполения',
	},
];

const passwordRules: Rule[] = [
	{
		pattern:
			/^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()?/\\]).{8,32}$/,
		message: 'слабый пароль',
	},
	{
		min: 8,
		message: 'минимум 8 символов',
	},
];

export const validator = (isPassword: boolean): Rule[] =>
	isPassword ? [...passwordRules, ...commonRules] : commonRules;

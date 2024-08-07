import { ThemeConfig } from "antd";

const BASE_CONTROL_OPTIONS = {
	borderRadius: 999,
	controlHeight: 34,
};

export const AntConfig: ThemeConfig = {
	token: {
		colorPrimary: 'rgb(39, 158, 249)',
		colorText: 'rgb(85, 105, 122)'
	},
	components: {
		Button: {
			...BASE_CONTROL_OPTIONS
		},
		Input: {
			...BASE_CONTROL_OPTIONS,
			borderRadius: 999,
		},
		Select: {
			...BASE_CONTROL_OPTIONS,
		},
		DatePicker: {
			...BASE_CONTROL_OPTIONS,
		},
	},
}
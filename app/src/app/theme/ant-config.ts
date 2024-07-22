import { ThemeConfig } from "antd";
import { Colors } from 'constants/Colors';

const BASE_CONTROL_OPTIONS = {
	borderRadius: 4,
	controlHeight: 32,
};

export const AntConfig: ThemeConfig = {
	token: {
		colorPrimary: Colors.primary
	},
	components: {
		Button: {
			...BASE_CONTROL_OPTIONS
		},
		Input: {
			...BASE_CONTROL_OPTIONS,
		},
		Select: {
			...BASE_CONTROL_OPTIONS,
		},
		DatePicker: {
			...BASE_CONTROL_OPTIONS,
		},
	},
}
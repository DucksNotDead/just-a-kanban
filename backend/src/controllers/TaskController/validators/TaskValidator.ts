import { checkValid } from "../../../global/validate";
import { Task } from "../../../entity/Task";
import { IsNumericOptions } from "express-validator/lib/options";

export const TaskValidator = checkValid<Task>({
	title: { isString: true },
	body: { isJSON: true },
	deadline: {
		optional: true,
		isString: true,
	},
	starts: {
		optional: true,
		isString: true,
	},
	category: {
		optional: true,
		isNumeric: true,
	},
});

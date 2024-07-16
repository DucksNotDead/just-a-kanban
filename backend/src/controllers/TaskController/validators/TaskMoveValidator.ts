import { checkValid } from "../../../global/validate";

export const TaskMoveValidator = checkValid({
	id: { isNumeric: true },
	step: { isNumeric: true },
	reason: { isString: true, optional: true },
});

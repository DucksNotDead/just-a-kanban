import { checkValid } from "../global/validate";

export const IdValidator = checkValid({
	id: {
		isNumeric: true,
	},
});

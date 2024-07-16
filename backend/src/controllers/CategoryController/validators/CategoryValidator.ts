import { checkValid } from "../../../global/validate";
import { Category } from "../../../entity/Category";

export const CategoryValidator = checkValid<Category>({
	color: {
		isHexColor: true,
	},
	name: {
		isString: true,
	},
});

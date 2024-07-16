import { IAppController } from "../../global/types";
import { getUserCategories } from "./operations/getUserCategories";
import { createCategory } from "./operations/createCategory";
import { deleteCategory } from "./operations/deleteCategory";
import { updateCategory } from "./operations/updateCategory";
import { CategoryValidator } from "./validators/CategoryValidator";
import { IdValidator } from "../../common/IdValidator";
import { FullCategoryValidator } from "./validators/FullCategoryValidator";

export const CategoryController: IAppController = {
	"get|/categories": { action: getUserCategories },
	"post|/categories": { action: createCategory, validator: CategoryValidator },
	"delete|/categories": { action: deleteCategory, validator: IdValidator },
	"put|/categories": {
		action: updateCategory,
		validator: FullCategoryValidator,
	},
};

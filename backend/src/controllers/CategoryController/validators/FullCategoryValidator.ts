import { checkValid } from "../../../global/validate";
import { Category } from "../../../entity/Category";
import { IsNumericOptions } from "express-validator/lib/options";

export const FullCategoryValidator = checkValid<Category>({
  id: {
    isNumeric: true
  },
  color: {
    isHexColor: true,
    optional: true
  },
  name: {
    isString:true,
    optional: true
  }
})
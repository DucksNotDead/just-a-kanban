import { checkValid } from "../../../global/validate";
import { Task } from "../../../entity/Task";

export const FullTaskValidator = checkValid<Task>({
  id: { isNumeric: true },
  title: { isString: true, optional: true },
  body: { isJSON: true, optional: true },
  category: { isNumeric: true, optional: true },
  deadline: { isString: true, optional: true },
})
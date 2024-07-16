import { IAppController } from "../../global/types";
import { getUserTasks } from "./operations/getUserTasks";
import { getFullTask } from "./operations/getFullTask";
import { createTask } from "./operations/createTask";
import { updateTask } from "./operations/updateTask";
import { moveTask } from "./operations/moveTask";
import { deleteTask } from "./operations/deleteTask";
import { TaskValidator } from "./validators/TaskValidator";
import { FullTaskValidator } from "./validators/FullTaskValidator";
import { IdValidator } from "../../common/IdValidator";
import { TaskMoveValidator } from "./validators/TaskMoveValidator";

export const TaskController: IAppController = {
	"get|/tasks": { action: getUserTasks },
	"get|/task": { action: getFullTask, validator: IdValidator },
	"post|/tasks": { action: createTask, validator: TaskValidator },
	"put|/tasks": { action: updateTask, validator: FullTaskValidator },
	"put|/task-move": { action: moveTask, validator: TaskMoveValidator },
	"delete|/tasks": { action: deleteTask, validator: IdValidator },
};

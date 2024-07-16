import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Category } from "../entity/Category";
import { Task } from "../entity/Task";
import { DB_CONFIG } from "../global/const";
import { Step } from "../entity/Step";

export const AppDataSource = new DataSource({
	...DB_CONFIG,
	type: "mysql",
	synchronize: true,
	logging: false,
	entities: [User, Task, Category, Step],
	migrations: [],
	subscribers: [],
});

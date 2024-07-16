import { AppDataSource } from "./data-source";
import { User } from "../entity/User";
import { Category } from "../entity/Category";
import { Task } from "../entity/Task";
import { Step } from "../entity/Step";

export const db = {
  init: async () => AppDataSource.initialize(),
  users: () => AppDataSource.getRepository(User),
  categories: () => AppDataSource.getRepository(Category),
  tasks: () => AppDataSource.getRepository(Task),
  steps: () => AppDataSource.getRepository(Step),
} as const
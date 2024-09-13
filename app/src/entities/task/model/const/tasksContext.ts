import { ITasksContextValue } from 'entities/task';
import { createContext } from 'react';

export const tasksContext = createContext<ITasksContextValue>({
  tasks: [],
  tasksPending: false,
  dispatchTasks: () => [],
});

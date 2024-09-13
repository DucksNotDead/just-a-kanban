import { useBoard } from 'entities/board';
import {
  TTasksReducer,
  tasksContext,
  tasksReducer,
  useTasksApi,
} from 'entities/task';
import { ReactNode, useEffect, useReducer } from 'react';
import { usePending } from 'shared/utils';

interface IProps {
  children: ReactNode;
}

export function TasksContextProvider({ children }: IProps) {
  const tasksApi = useTasksApi();
  const { board } = useBoard();

  const [tasks, dispatchTasks] = useReducer<TTasksReducer>(tasksReducer, []);
  const [tasksPending, setTasksPending] = usePending();

  useEffect(() => {
    if (board?.slug) {
      setTasksPending(() => true);
      tasksApi
        .get(board.slug)
        .then((data) => {
          data && dispatchTasks({ type: 'get', data });
        })
        .finally(() => setTasksPending(() => false));
    }

    return () => {
      setTasksPending(() => false);
      dispatchTasks({ type: 'reset', data: null });
    };
  }, [board]);

  return (
    <tasksContext.Provider
      value={{
        tasks,
        tasksPending,
        dispatchTasks,
      }}
    >
      {children}
    </tasksContext.Provider>
  );
}

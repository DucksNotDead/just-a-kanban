import { useTasks } from 'entities/task';
import { useCurrentUser } from 'entities/user';
import { useSocket } from 'features/Socket';

export function useBoardPageTaskCardsSocket() {
  const { user } = useCurrentUser();
  const { dispatchTasks } = useTasks();

  useSocket({
    event: 'taskCreate',
    callback: ({ content }) => {
      dispatchTasks({ type: 'create', data: content });
    },
  });

  useSocket({
    event: 'taskDelete',
    callback: ({ content }) => {
      dispatchTasks({ type: 'delete', data: content });
    },
  });

  useSocket(
    {
      event: 'taskMetaChange',
      callback: ({ from, content }) => {
        if (user && user.id !== from) {
          dispatchTasks({ type: 'changeMeta', data: content });
        }
      },
    },
    [user],
  );

  useSocket({
    event: 'taskTodosChange',
    callback: ({ content }) => {
      dispatchTasks({ type: 'todosChange', data: content });
    },
  });

  useSocket({
    event: 'taskTodoToggle',
    callback: ({ content: { taskId, checked } }) => {
      dispatchTasks({ type: 'todoToggle', data: { taskId, checked } });
    },
  });
}

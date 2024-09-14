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
      callback: ({ content }) => {
        dispatchTasks({ type: 'changeMeta', data: content });
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

  useSocket(
    {
      event: 'taskOrderChange',
      callback: ({ from, content }) => {
        if (user && from !== user.id) {
          dispatchTasks({ type: 'changeOrder', data: content.tasks });
        }
      },
    },
    [user],
  );

  useSocket({
    event: 'taskStepChange',
    callback: ({ content }) => {
      dispatchTasks({ type: 'changeStep', data: content });
    },
  });

  useSocket({
    event: 'taskReviewerSet',
    callback: ({ content }) => {
      dispatchTasks({
        type: 'setReviewer',
        data: { taskId: content.taskId, userId: content.reviewer },
      });
    },
  });
}

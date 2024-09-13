import { ITodo } from 'entities/todo';
import { useSocket } from 'features/Socket';
import { Dispatch, SetStateAction } from 'react';

export function useTaskDetailTodosSocket(
  taskId: number | null,
  setter: Dispatch<SetStateAction<ITodo[]>>,
  pendingSetter: Dispatch<SetStateAction<boolean>>,
) {
  useSocket(
    {
      event: 'taskTodosChange',
      callback: ({ content }) => {
        if (content.taskId === taskId) {
          pendingSetter(() => true)
          setter(() => []);
          content.todos.sort((a, b) => a.order! - b.order!);
          setTimeout(() => {
            setter(() => content.todos);
            pendingSetter(() => false)
          }, 400);
        }
      },
    },
    [taskId],
  );

  useSocket({
    event: 'taskTodoToggle',
    callback: ({ content }) => {
      setter((prevState) => {
        const fn = (t: ITodo) => t.id === content.todoId;
        const item = prevState.find(fn);
        if (!item) {
          return prevState;
        }
        item.checked = !item.checked;
        const index = prevState.findIndex(fn);
        return [
          ...prevState.slice(0, index),
          item,
          ...prevState.slice(index + 1),
        ];
      });
    },
  });
}

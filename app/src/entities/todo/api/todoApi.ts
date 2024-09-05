import { ITodo, ITodoCreateRequest } from 'entities/todo';
import { useConnect } from 'shared/utils';

const urls = {
  base: '/todos',
  task(id: number) {
    return `${this.base}/${id}`;
  },
  item(taskId: number, todoId: number) {
    return `${this.task(taskId)}/${todoId}`;
  },
};

export function useTodosApi() {
  const connect = useConnect();

  return {
    get: async (taskId: number) => await connect<ITodo[]>(urls.task(taskId)),
    create: async (taskId: number, dto: ITodoCreateRequest) =>
      await connect(urls.task(taskId), 'post', dto),
    toggle: async (todoId: number, taskId: number) =>
      await connect(urls.item(taskId, todoId), 'patch'),
  };
}

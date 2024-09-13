import { ITaskCreateRequest, ITaskFull } from 'entities/task';
import { useConnect } from 'shared/utils';

const urls = {
  base: '/tasks',
  board(slug: string) {
    return `${this.base}/board/${slug}`;
  },
  item(id: number, postfix: 'meta' | 'order' | 'step' | 'reviewer' | '' = '') {
    return `${this.base}/${id}${postfix.length ? `/${postfix}` : ''}`;
  },
  order(id: number, order: number) {
    return `${this.item(id, 'order')}/${order}`;
  },
  step(id: number, stepId: number, by: 'responsible' | 'manager') {
    return `${this.item(id, 'step')}/${stepId}/${by}`;
  },
};

export function useTasksApi() {
  const connect = useConnect();

  return {
    get: async (boardSlug: string) =>
      await connect<ITaskFull[]>(urls.board(boardSlug)),
    create: async (boardSlug: string, dto: ITaskCreateRequest) =>
      await connect<number>(urls.board(boardSlug), 'post', dto),
    changeOrder: async (taskId: number, order: number) =>
      await connect(urls.order(taskId, order), 'patch'),
    changeStep: async (
      taskId: number,
      stepId: number,
      by: 'responsible' | 'manager',
    ) => await connect(urls.step(taskId, stepId, by), 'patch'),
    changeMeta: async (taskId: number, dto: ITaskCreateRequest) =>
      await connect(urls.item(taskId, 'meta'), 'patch', dto),
    setReviewer: async (taskId: number) =>
      await connect(urls.item(taskId, 'reviewer'), 'patch'),
    delete: async (taskId: number) => await connect(urls.item(taskId), 'delete'),
  };
}

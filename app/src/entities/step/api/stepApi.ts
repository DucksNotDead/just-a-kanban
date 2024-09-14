import { IStep, TStep } from 'entities/step';
import { useConnect } from 'shared/utils';

const urls = {
  base: '/steps',
  reordering(boardSlug: string, stepId: TStep, status: 'start' | 'end') {
    return `${this.base}/${stepId}/${boardSlug}/${status}`;
  },
};

export function useStepsApi() {
  const connect = useConnect();

  return {
    get: async () => await connect<IStep[]>(urls.base),
    setReorder: async (boardSlug: string, stepId: TStep) =>
      await connect(urls.reordering(boardSlug, stepId, 'start'), 'post'),
    resetReorder: async (boardSlug: string, stepId: TStep) =>
      await connect(urls.reordering(boardSlug, stepId, 'end'), 'post'),
  };
}

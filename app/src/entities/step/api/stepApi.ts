import { IStep } from 'entities/step';
import { useConnect } from 'shared/utils';


const urls = {
  base: '/steps',
};

export function useStepsApi() {
  const connect = useConnect();

  return {
    get: async () => await connect<IStep[]>(urls.base),
  };
}

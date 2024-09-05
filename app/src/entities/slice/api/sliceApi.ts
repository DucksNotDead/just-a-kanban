import { ISlice, ISliceCreateRequest } from 'entities/slice';
import { useConnect } from 'shared/utils';

const urls = {
  base: '/slices',
  board(slug: string) {
    return `${this.base}/${slug}`;
  },
  item(id: number) {
    return `${this.base}/${id}`;
  },
};

export function useSlicesApi() {
  const connect = useConnect();

  return {
    get: async (boardSlug: string) =>
      await connect<ISlice[]>(urls.board(boardSlug)),
    create: async (boardSlug: string, dto: ISliceCreateRequest) =>
      await connect(urls.board(boardSlug), 'post', dto),
    update: async ({ id, ...data }: ISlice) =>
      await connect(urls.item(id), 'put', data),
    delete: async (id: number) => await connect(urls.item(id), 'delete'),
  };
}

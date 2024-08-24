import {
  IBoard,
  IBoardChangeUsersRequest,
  IBoardCreateRequest,
  IBoardWithUsers,
} from 'entities/board';
import { useConnect } from 'shared/utils';

const urls = {
  base: '/boards',
  items() {
    return this.base;
  },
  bySlug(slug: string) {
    return `${this.base}/${slug}`;
  },
  name(slug: string, name: string) {
    return `${this.bySlug(slug)}/name/${name}`;
  },
  users(slug: string) {
    return `${this.bySlug(slug)}/users`;
  },
};

export function useBoardsApi() {
  const connect = useConnect();

  return {
    getAll: async () => await connect<IBoardWithUsers[]>(urls.items()),

    getBySlug: async (boardSlug: string) =>
      await connect<IBoard>(urls.bySlug(boardSlug)),

    create: async (dto: IBoardCreateRequest) =>
      await connect<IBoardWithUsers>(urls.items(), 'post', dto),

    changeName: async (boardSlug: string, name: string) =>
      await connect<IBoard>(urls.name(boardSlug, name), 'patch'),

    changeUsers: async (boardSlug: string, dto: IBoardChangeUsersRequest) =>
      await connect<IBoard>(urls.users(boardSlug), 'patch', dto),

    delete: async (boardSlug: string) =>
      await connect<number>(urls.bySlug(boardSlug), 'delete'),
  };
}

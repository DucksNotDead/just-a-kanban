import { IUser, IUserCreateRequest, IUserCreateResponse } from 'entities/user';
import { useConnect } from 'shared/utils';

const urls = {
  base: '/users',
  users() {
    return this.base;
  },
  item(id: number) {
    return `${this.base}/${id}`;
  },
  usersInBoard(slug: string) {
    return `${this.base}/${slug}`;
  },
};

export function useUsersApi() {
  const connect = useConnect();

  return {
    adminGetUsers: async () => await connect<IUser[]>(urls.users()),
    getUsersInBoard: async (boardSlug: string) =>
      await connect<IUser[]>(urls.usersInBoard(boardSlug)),
    create: async (dto: IUserCreateRequest) =>
      await connect<IUserCreateResponse>(urls.users(), 'post', dto),
    delete: async (id: number) =>
      await connect<number>(urls.item(id), 'delete'),
  };
}

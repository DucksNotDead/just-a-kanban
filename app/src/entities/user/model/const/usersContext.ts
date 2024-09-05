import { IUsersContextValue } from 'entities/user';
import { createContext } from 'react';

export const usersContext = createContext<IUsersContextValue>({
  users: [],
  usersPending: true,
  getUser: () => undefined
});

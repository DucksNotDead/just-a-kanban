import { IUserContextValue } from 'entities/user/model/types/userTypes';
import { createContext } from 'react';

export const userContext = createContext<IUserContextValue>({
  user: null,
  login: async () => false,
  logout: () => {},
  pending: true,
  isLogin: false,
  hasToken: false,
});

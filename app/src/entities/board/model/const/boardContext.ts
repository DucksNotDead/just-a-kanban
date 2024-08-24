import { IBoardContext } from 'entities/board';
import { createContext } from 'react';

export const boardContext = createContext<IBoardContext>({
  board: null,
  pending: false,
  hasManagerAccess: false,
});

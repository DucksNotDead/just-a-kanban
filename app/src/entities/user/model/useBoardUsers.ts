import { usersContext } from 'entities/user';
import { useContext } from 'react';

export function useBoardUsers() {
  return useContext(usersContext)
}
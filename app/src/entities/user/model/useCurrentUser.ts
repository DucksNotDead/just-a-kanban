import { userContext } from 'entities/user';
import { useContext } from 'react';

export function useCurrentUser() {
  return useContext(userContext)
}

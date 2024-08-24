import { boardContext } from 'entities/board';
import { useContext } from 'react';

export function useBoard() {
  return useContext(boardContext);
}

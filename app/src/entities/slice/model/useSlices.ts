import { slicesContext } from 'entities/slice';
import { useContext } from 'react';

export function useSlices() {
  return useContext(slicesContext);
}

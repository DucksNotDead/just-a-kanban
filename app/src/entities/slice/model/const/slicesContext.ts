import { ISliceContext } from 'entities/slice';
import { createContext } from 'react';

export const slicesContext = createContext<ISliceContext>({
  slices: [],
  slicesPending: true,
  createSlice: () => undefined,
  deleteSlice: () => new Promise(() => null),
});

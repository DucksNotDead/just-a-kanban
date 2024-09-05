import { useBoard } from 'entities/board';
import {
  ISlice,
  ISliceCreateRequest,
  slicesContext,
  useSlicesApi,
} from 'entities/slice';
import { useSocket } from 'entities/socket';
import { ReactNode, useCallback, useEffect, useState } from 'react';

interface IProps {
  children: ReactNode;
}

export function SlicesContextProvider({ children }: IProps) {
  const slicesApi = useSlicesApi();
  const { board } = useBoard();
  const [slices, setSlices] = useState<ISlice[]>([]);
  const [slicesPending, setSlicesPending] = useState(true);

  const createSlice = useCallback(
    (dto: ISliceCreateRequest) => {
      if (board) {
        return slicesApi.create(board.slug, dto);
      }
    },
    [board],
  );

  const deleteSlice = useCallback((id: number) => {
    return slicesApi.delete(id);
  }, []);

  useSocket({
    event: 'sliceCreate',
    callback: ({ content }) =>
      setSlices((prevState) => [...prevState, content]),
  });

  useSocket({
    event: 'sliceUpdate',
    callback: ({ content }) =>
      setSlices((prevState) => [...prevState, content]),
  });

  useSocket({
    event: 'sliceDelete',
    callback: ({ content }) =>
      setSlices((prevState) =>
        prevState.filter((slice) => slice.id !== content),
      ),
  });

  useEffect(() => {
    if (board) {
      slicesApi
        .get(board.slug)
        .then((data) => setSlices(() => data ?? []))
        .finally(() => setSlicesPending(() => false));
    }
  }, [board]);

  return (
    <slicesContext.Provider
      value={{ slicesPending: slicesPending, slices, createSlice, deleteSlice }}
    >
      {children}
    </slicesContext.Provider>
  );
}

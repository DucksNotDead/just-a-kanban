import { socketContext } from 'features/Socket';
import { useContext, useEffect } from 'react';

import { TSocketFnArgs } from './types/socketTypes';

export function useSocket({ event, callback }: TSocketFnArgs, deps?: any[]) {
  const { socket } = useContext(socketContext);

  useEffect(() => {
    socket?.on(event, callback);

    return () => {
      socket?.off(event, callback);
    };
  }, [socket, event, callback, ...(deps ?? [])]);
}

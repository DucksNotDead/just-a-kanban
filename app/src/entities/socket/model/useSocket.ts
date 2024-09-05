import { TSocketFnArgs, socketContext } from 'entities/socket';
import { useContext, useEffect } from 'react';

export function useSocket({ event, callback }: TSocketFnArgs) {
  const { socket } = useContext(socketContext);

  useEffect(() => {
    socket?.on(event, callback);

    return () => {
      socket?.off(event, callback)
    }
  }, [socket, event, callback]);
}

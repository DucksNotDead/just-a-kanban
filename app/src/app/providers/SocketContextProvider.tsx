import { useBoard } from 'entities/board';
import {socketContext} from 'features/Socket'
import { ReactNode, useEffect, useState } from 'react';
import { TOKEN_KEY, WS_BASE_URL } from 'shared/const';
import { Socket, io } from 'socket.io-client';

interface IProps {
  children: ReactNode;
}

export function SocketContextProvider({ children }: IProps) {
  const { board } = useBoard();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const instance = io(WS_BASE_URL, {
      autoConnect: false,
      extraHeaders: {
        authorization: 'Bearer ' + window.localStorage.getItem(TOKEN_KEY),
      },
      query: { boardSlug: board?.slug },

    });

    instance.on('connect', () => {
      setSocket(() => instance)
      // eslint-disable-next-line no-console
      console.log('ws: connected');
    })

    instance.on('disconnect', () => {
      setSocket(() => null)
      instance.removeAllListeners()
      // eslint-disable-next-line no-console
      console.log('ws: disconnected');
    })

    // eslint-disable-next-line no-console
    instance.onAny(console.log)

    if (board?.slug) {
      instance.open()
    } else {
      instance.close()
    }

    return () => {
      instance.close()
    }
  }, [board]);

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
}

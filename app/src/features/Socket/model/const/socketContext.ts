import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export const socketContext = createContext<{
  socket: Socket | null;
}>({
  socket: null,
});

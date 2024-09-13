import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { ISocketMessage } from './socket.const';

@Injectable()
export class SocketService {
  private server: Server = null;
  private clients: Record<string, Socket> = {};

  init(server: Server) {
    this.server = server;
  }

  joinRoom(client: Socket, boardSlug: string, onlyManagers?: boolean) {
    client.join(this.roomName(boardSlug, onlyManagers));
  }

  leaveRoom(client: Socket, boardSlug: string, onlyManagers?: boolean) {
    client.leave(this.roomName(boardSlug, onlyManagers));
  }

  addClient(id: number, bordSlug: string, client: Socket) {
    const key = this.toClientId(bordSlug, id);
    if (!this.clients[key]) {
      this.clients = { ...this.clients, [key]: client };
      return true;
    } else {
      return false;
    }
  }

  removeClient(id: number, boardSlug: string) {
    try {
      delete this.clients[this.toClientId(boardSlug, id)];
    } catch {
      // eslint-disable-next-line no-console
      console.log('ws: client not found');
    }
  }

  send(message: ISocketMessage, boardSlug: string, taskResponsibleId?: number) {
    if (taskResponsibleId) {
      const client = this.clients
        ? this.clients[this.toClientId(boardSlug, taskResponsibleId)]
        : null;

      if (client && !client.rooms.has(this.roomName(boardSlug, true))) {
        this.emit(client, message);
      }
    }
    this.emit({ boardSlug, onlyManagers: !!taskResponsibleId }, message);
  }

  private emit(
    to: Socket | { boardSlug: string; onlyManagers: boolean },
    { event, ...message }: ISocketMessage,
  ) {
    (to instanceof Socket
      ? to
      : this.server.to(this.roomName(to.boardSlug, to.onlyManagers))
    ).emit(event, message);
  }

  private toClientId(boardSlug: string, id: number) {
    return id + '|' + boardSlug;
  }

  private roomName(boardSlug: string, onlyManagers: boolean) {
    return boardSlug + (onlyManagers ? '__managers' : '');
  }
}

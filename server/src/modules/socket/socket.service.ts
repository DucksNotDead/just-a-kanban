import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { ISocketMessage } from './socket.const';
import { Exception } from '../../config/exception';

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
    this.clients = { ...this.clients, [this.toClientId(bordSlug, id)]: client };
  }

  removeClient(id: number, boardSlug: string) {
    try {
      delete this.clients[this.toClientId(boardSlug, id)];
    } catch {
      console.log('ws: client not found');
    }
  }

  send(message: ISocketMessage, boardSlug: string, taskResponsibleId?: number) {
    this.emit({ boardSlug, onlyManagers: !!taskResponsibleId }, message);
    if (taskResponsibleId) {
      const client = this.clients
        ? this.clients[this.toClientId(boardSlug, taskResponsibleId)]
        : null;

      if (!client)
        {throw Exception.NotFound(
          `ws: client (board: ${boardSlug}, id: ${taskResponsibleId})`,
        );}

      this.emit(client, message);
    }
  }

  private emit(
    to: Socket | { boardSlug: string; onlyManagers: boolean },
    message: ISocketMessage,
  ) {
    (to instanceof Socket
      ? to
      : this.server.to(this.roomName(to.boardSlug, to.onlyManagers))
    ).emit('onMessage', message);
  }

  private toClientId(boardSlug: string, id: number) {
    return id + '|' + boardSlug;
  }

  private roomName(boardSlug: string, onlyManagers: boolean) {
    return boardSlug + (onlyManagers ? '__managers' : '');
  }
}

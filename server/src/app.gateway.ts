import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { AuthService } from './modules/auth/auth.service';
import { BOARD_SLUG_KEY } from './modules/boards/boards.const';
import { BoardsService } from './modules/boards/boards.service';
import { SocketService } from './modules/socket/socket.service';

import 'dotenv/config';

@WebSocketGateway(80, { cors: { origin: process.env.CORS_ORIGIN }})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly socketService: SocketService,
    private readonly authService: AuthService,
    private readonly boardsService: BoardsService,
  ) {}

  afterInit(server: Server) {
    this.socketService.init(server);
    console.log(server);
  }

  async handleConnection(client: Socket) {
    try {
      const { userId, boardSlug, isManager } =
        await this.getClientCredits(client);

      const addStatus = this.socketService.addClient(userId, boardSlug, client);
      this.socketService.joinRoom(client, boardSlug);

      if (isManager) {
        this.socketService.joinRoom(client, boardSlug, true);
        if (addStatus) {
          this.socketService.send(
            {
              from: userId,
              event: 'join',
              content: {},
            },
            boardSlug,
          );
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ws: connect error', e);
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const { userId, boardSlug, isManager } =
        await this.getClientCredits(client);

      this.socketService.leaveRoom(client, boardSlug);
      this.socketService.removeClient(userId, boardSlug);

      if (isManager) {
        this.socketService.leaveRoom(client, boardSlug, true);
        this.socketService.send(
          {
            from: userId,
            event: 'leave',
            content: {},
          },
          boardSlug,
        );
      }
    } catch {
      // eslint-disable-next-line no-console
      console.log('ws: disconnect error');
    }
  }

  private async getClientCredits(client: Socket) {
    try {
      const {
        headers: { authorization },
        query: { [BOARD_SLUG_KEY]: boardSlug },
      } = client.handshake;
      const user = await this.authService.auth(authorization);
      const { users, managers } = await this.boardsService.getForAccessChecks(
        boardSlug as string,
      );
      if (!users.find((u) => u.id === user.id)) {
        return null;
      }
      return {
        userId: user.id,
        boardSlug: boardSlug as string,
        isManager: !!managers.find((m) => m.id === user.id),
      };
    } catch {
      // eslint-disable-next-line no-console
      console.log('ws: credits error');
    }
  }
}

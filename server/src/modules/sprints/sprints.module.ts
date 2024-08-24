import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SprintsController } from './sprints.controller';
import { Sprint } from "./sprints.model";
import { SprintsService } from "./sprints.service";
import { BoardsModule } from "../boards/boards.module";
import { SocketModule } from "../socket/socket.module";

@Module({
  providers: [SprintsService],
  imports: [TypeOrmModule.forFeature([Sprint]), BoardsModule, SocketModule],
  exports: [SprintsService],
  controllers: [SprintsController]
})
export class SprintsModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SlicesController } from './slices.controller';
import { Slice } from "./slices.model";
import { SlicesService } from "./slices.service";
import { BoardsModule } from "../boards/boards.module";
import { SocketModule } from "../socket/socket.module";

@Module({
  providers: [SlicesService],
  imports: [TypeOrmModule.forFeature([Slice]), BoardsModule, SocketModule],
  exports: [SlicesService],
  controllers: [SlicesController]
})
export class SlicesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StepsController } from './steps.controller';
import { Step } from './steps.model';
import { StepsService } from './steps.service';
import { BoardsModule } from '../boards/boards.module';
import { SocketModule } from '../socket/socket.module';

@Module({
  providers: [StepsService],
  imports: [TypeOrmModule.forFeature([Step]), SocketModule, BoardsModule],
  controllers: [StepsController],
  exports: [StepsService],
})
export class StepsModule {}

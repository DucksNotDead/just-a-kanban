import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardsController } from "./boards.controller";
import { Board } from './boards.model';
import { BoardsService } from './boards.service';
import { Slice } from '../slices/slices.model';
import { User } from "../users/users.model";

@Module({
  providers: [BoardsService],
  imports: [TypeOrmModule.forFeature([Board, User, Slice])],
  exports: [BoardsService],
  controllers: [BoardsController]
})
export class BoardsModule {}

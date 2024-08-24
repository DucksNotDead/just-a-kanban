import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardsController } from "./boards.controller";
import { Board } from './boards.model';
import { BoardsService } from './boards.service';
import { Sprint } from '../sprints/sprints.model';
import { User } from "../users/users.model";

@Module({
  providers: [BoardsService],
  imports: [TypeOrmModule.forFeature([Board, User, Sprint])],
  exports: [BoardsService],
  controllers: [BoardsController]
})
export class BoardsModule {}

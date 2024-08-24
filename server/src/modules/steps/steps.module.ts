import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StepsController } from "./steps.controller";
import { Step } from './steps.model';
import { StepsService } from './steps.service';

@Module({
  providers: [StepsService],
  imports: [TypeOrmModule.forFeature([Step])],
  controllers: [StepsController],
  exports: [StepsService]
})
export class StepsModule {}

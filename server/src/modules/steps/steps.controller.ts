import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { StepsService } from "./steps.service";
import { ApiMethod } from "../../config/swagger";

@ApiTags('steps')
@Controller('steps')
export class StepsController {
  constructor(private readonly service: StepsService) {}

  @ApiMethod('Get steps')
  @Get()
  get() {
    return this.service.get()
  }
}

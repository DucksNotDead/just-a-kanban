import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Step } from "./steps.model";
import { Exception } from "../../config/exception";

@Injectable()
export class StepsService {
  constructor(
    @InjectRepository(Step) private readonly steps: Repository<Step>,
  ) {}

  async get() {
    return await this.steps.find();
  }

  async getFirst() {
    return await this.getById(1)
  }

  async getById(id: number) {
    const candidate = await this.steps.findOne({
      where: { id },
      relations: ['tasks']
    });
    if (!candidate) {throw Exception.NotFound('step')}
    return candidate
  }
}

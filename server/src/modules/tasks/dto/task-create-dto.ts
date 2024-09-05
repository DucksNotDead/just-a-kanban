import { ApiField } from "../../../config/swagger";

export class TaskCreateDto {
  @ApiField('TASK_TITLE')
  title: string;

  @ApiField('DATE')
  starts?: string;

  @ApiField('DATE')
  deadline: string;

  @ApiField('ID')
  responsible: number;

  @ApiField('ID')
  slice: number;
}

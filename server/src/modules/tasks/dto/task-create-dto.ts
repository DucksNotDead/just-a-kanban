import { ApiField } from "../../../config/swagger";

export class TaskCreateDto {
  @ApiField('TASK_TITLE')
  title: string;

  @ApiField('DATE')
  starts?: string;

  @ApiField('DATE')
  deadline: string;

  @ApiField('ID')
  responsibleId: number;

  @ApiField('ID')
  sprintId: number;
}

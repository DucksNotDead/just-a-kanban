import { ApiField } from "../../../config/swagger";

export class TaskMetaChangeDto {
  @ApiField("TASK_TITLE")
  title?: string;

  @ApiField('DATE')
  starts?: string;

  @ApiField('DATE')
  deadline?: string;

  @ApiField('ID')
  responsibleId?: number;

  @ApiField('ID')
  sprintId?: number;
}
import { ApiField } from '../../../config/swagger';

export class TaskMoveDto {
  @ApiField('TASK_ORDER')
  order: number;

  @ApiField('ID')
  step: number;
}

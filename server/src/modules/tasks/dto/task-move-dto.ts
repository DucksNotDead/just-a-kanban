import { ApiField } from '../../../config/swagger';

export class TaskMoveDto {
  @ApiField('ORDER')
  order: number;

  @ApiField('ID')
  step: number;
}

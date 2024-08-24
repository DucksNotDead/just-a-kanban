import { ApiField } from '../../../config/swagger';

export class SprintUpdateDto {
  @ApiField('SPRINT_NAME')
  name: string;

  @ApiField('COLOR')
  color: string;
}

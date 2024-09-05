import { ApiField } from '../../../config/swagger';

export class SliceUpdateDto {
  @ApiField('SLICE_NAME')
  name: string;

  @ApiField('COLOR')
  color: string;
}

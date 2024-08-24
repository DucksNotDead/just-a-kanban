import { ApiField } from '../../../config/swagger';

export class CommentCreateDto {
  @ApiField('COMMENT_TEXT')
  text: string;
}

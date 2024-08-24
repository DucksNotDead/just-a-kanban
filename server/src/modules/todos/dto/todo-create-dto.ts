import { ApiField } from "../../../config/swagger";

export class TodoCreateDto {
  @ApiField('TODO_LABEL')
  label: string
}
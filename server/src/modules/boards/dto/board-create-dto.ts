import { BoardChangeUsersDto } from "./board-change-users-dto";
import { ApiField } from "../../../config/swagger";

export class BoardCreateDto extends BoardChangeUsersDto {
  @ApiField('BOARD_NAME')
  name: string;
}

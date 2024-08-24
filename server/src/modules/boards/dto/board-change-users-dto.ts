import { ApiField } from "../../../config/swagger";

export class BoardChangeUsersDto {
  @ApiField('IDS')
  users: number[];

  @ApiField('IDS')
  managers: number[];
}

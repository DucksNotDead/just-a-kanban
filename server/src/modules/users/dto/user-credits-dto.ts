import { ApiProperty } from "@nestjs/swagger";

export class UserBaseDto {
  @ApiProperty({ example: 'john1234' })
  username: string;
}

export class UserCreditsDto extends UserBaseDto{
  @ApiProperty({ example: 'StrongPassword!1234' })
  password: string;
}
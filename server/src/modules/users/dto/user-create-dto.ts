import { ApiProperty } from '@nestjs/swagger';

import { UserBaseDto } from './user-credits-dto';

export class UserCreateDto extends UserBaseDto {
  @ApiProperty({ example: 'John' })
  name: string;
  
  @ApiProperty({ example: false })
  isAdmin?: boolean;
}



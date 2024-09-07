import { ApiProperty } from '@nestjs/swagger';

export class PerformerDto {
  @ApiProperty({ example: 'name', description: 'unique name' })
  name: string;
  @ApiProperty({ example: 'nickName', description: 'unique nickName' })
  nickName: string;
  @ApiProperty({ example: 'name@email.com', description: 'unique email' })
  email: string;
  @ApiProperty({ example: '12345qwerty', description: 'unique password' })
  password: string;
}

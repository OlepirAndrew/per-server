import { ApiProperty } from '@nestjs/swagger';

export class AdminDto {
  @ApiProperty({ example: 'admin.name', description: 'unique name' })
  name: string;
  @ApiProperty({ example: 'admin.name@email.com', description: 'unique email' })
  email: string;
  @ApiProperty({ example: '12345qwerty', description: 'unique password' })
  password: string;
}

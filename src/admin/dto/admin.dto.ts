import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ example: 'admin.name', description: 'unique name' })
  readonly name: string;
  @ApiProperty({ example: 'admin.name@email.com', description: 'unique email' })
  readonly email: string;
  @ApiProperty({ example: '12345qwerty', description: 'unique password' })
  readonly password: string;
}

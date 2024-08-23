import { Column, DataType, Table, Model } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface AdminCreationAttr {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: 'admins' })
export class AdminMod extends Model<AdminMod, AdminCreationAttr> {
  @ApiProperty({ example: '1', description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  // default allowNull: true, unique: false
  @ApiProperty({ example: 'admin.name', description: 'unique name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: 'admin.name@email.com', description: 'unique email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345qwerty', description: 'unique password' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  password: string;

  @ApiProperty({ example: 'milliseconds', description: 'last login date' })
  @Column({ type: DataType.DATE, allowNull: true })
  lastLogin: Date;
}

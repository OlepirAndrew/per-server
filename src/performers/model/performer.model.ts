import { Column, DataType, Table, Model } from 'sequelize-typescript';

interface PerCreationAttr {
  name: string;
  nickName: string;
  email: string;
  password: string;
}

@Table({ tableName: 'performers' })
export class PerformerMod extends Model<PerformerMod, PerCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  nickName: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  password: string;

  @Column({ type: DataType.DATE, allowNull: true })
  lastLogin: Date;
}

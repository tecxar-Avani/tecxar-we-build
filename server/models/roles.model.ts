import { Optional } from "sequelize";
import {
  Column,
  Model,
  DataType,
  AllowNull,
  Table,
} from "sequelize-typescript";
import { IRole } from "@interfaces/roles.interface";
export type RoleAttributes = Optional<IRole, "id">;

@Table({
  tableName: "roles",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  timestamps: true,
})
export default class Role
  extends Model<IRole, RoleAttributes>
  implements IRole
{
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  public id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public role: string;

  @Column({ type: DataType.INTEGER })
  public created_by: number;

  @Column({ type: DataType.INTEGER })
  public updated_by: number;

  @Column(DataType.DATE)
  public readonly createdAt!: Date;

  @Column(DataType.DATE)
  public readonly updatedAt!: Date;
}

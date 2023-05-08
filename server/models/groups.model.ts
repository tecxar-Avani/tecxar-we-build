import { Optional } from "sequelize";
import { Column, Model, DataType, Table } from "sequelize-typescript";
import { IGroups } from "@/interfaces/groups.interface";
export type GroupAttributes = Optional<IGroups, "id">;

@Table({
  tableName: "all_groups",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  timestamps: true,
})
export default class Groups
  extends Model<IGroups, GroupAttributes>
  implements IGroups
{
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  public id: number;

  @Column(DataType.TEXT)
  public title: string;

  @Column(DataType.DATE)
  public readonly createdAt!: Date;

  @Column(DataType.DATE)
  public readonly updatedAt!: Date;
}

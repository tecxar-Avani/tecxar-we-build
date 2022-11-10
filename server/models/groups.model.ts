import { Optional } from "sequelize";
import {
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  Table,
} from "sequelize-typescript";
import { IGroups } from "@/interfaces/groups.interface";
import VideoBuild from "@/models/videoBuilds.model ";
export type GroupAttributes = Optional<IGroups, "id">;

@Table({
  tableName: "groups",
  timestamps: true,
})
export default class Groups
  extends Model<IGroups, GroupAttributes>
  implements IGroups
{
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  public id: number;
  @AllowNull(false)
  @ForeignKey(() => VideoBuild)
  @Column(DataType.INTEGER)
  public build_id: number;
  @Column(DataType.TEXT)
  public title: string;

}

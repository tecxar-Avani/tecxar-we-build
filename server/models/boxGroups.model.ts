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
import { IBoxesGroups } from "@/interfaces/boxesgroups.interface";
import Group from "@/models/groups.model";
import Box from "@/models/boxes.model";

export type Boxes_GroupAttributes = Optional<IBoxesGroups, "id">;
@Table({
  tableName: "boxes_groups",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  timestamps: true,
})
export default class Boxes_Groups
  extends Model<IBoxesGroups, Boxes_GroupAttributes>
  implements IBoxesGroups {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  public id: number;

  @AllowNull(false)
  @ForeignKey(() => Box)
  @Column(DataType.INTEGER)
  public box_id: number;
  @BelongsTo(() => Box)
  public box_ids: Box;

  @AllowNull(false)
  @ForeignKey(() => Group)
  @Column(DataType.INTEGER)
  public group_id: number;
  @BelongsTo(() => Group)
  public group: Group;

  @Column(DataType.DATE)
  public readonly createdAt!: Date;

  @Column(DataType.DATE)
  public readonly updatedAt!: Date;
}

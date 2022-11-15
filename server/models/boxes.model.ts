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
import { IBoxes } from "@/interfaces/boxes.interface";
import VideoBuild from "@/models/videoBuilds.model ";
export type BoxAttributes = Optional<IBoxes, "id">;

@Table({
  tableName: "boxes",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  timestamps: true,
})
export default class Boxes
  extends Model<IBoxes, BoxAttributes>
  implements IBoxes
{
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  public id: number;

  @AllowNull(false)
  @ForeignKey(() => VideoBuild)
  @Column(DataType.INTEGER)
  public build_id: number;
  @BelongsTo(() => VideoBuild)
  public build: VideoBuild;

  @Column(DataType.TEXT)
  public description: string;

  @Column(DataType.INTEGER)
  public sorting_order: number;

  @Column(DataType.DATE)
  public readonly createdAt!: Date;

  @Column(DataType.DATE)
  public readonly updatedAt!: Date;
}

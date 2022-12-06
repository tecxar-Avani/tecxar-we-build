/* eslint-disable prettier/prettier */
import { Optional } from "sequelize";
import {
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  Table,
  Default,
} from "sequelize-typescript";
import { IVideoBuild,VideoTypeEnumType,difficultyLevelEnumType } from "@/interfaces/videoBuilds.interface";
import User from "@/models/user.model";

export type VideoBuildAttributes = Optional<IVideoBuild, "id">;
@Table({
  tableName: "video_builds",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
})
export default class VideoBuilds
  extends Model<IVideoBuild, VideoBuildAttributes>
  implements IVideoBuild
{
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  public id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public video_url: string;

  @Default("youtube")
  @Column(DataType.STRING)
  public provider: string;

  @Column(DataType.STRING)
  public type_of_video: any;

  @Column(DataType.STRING)
  public potential_polarization: any;

  @Column(DataType.STRING)
  public difficulty_level: any;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  public created_by: number;
  @BelongsTo(() => User)
  public created_by_user: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  public updated_by: number;
  @BelongsTo(() => User)
  public updated_by_user: User;

  @Column(DataType.DATE)
  public readonly createdAt!: Date;

  @Column(DataType.DATE)
  public readonly updatedAt!: Date;
}

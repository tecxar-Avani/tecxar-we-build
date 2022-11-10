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

  @Default('youtube')
  @Column(DataType.STRING)
  public provider: string;

  @Column(DataType.ENUM("theory", "practical"))
  public type_of_video: VideoTypeEnumType;

  @Column(DataType.ENUM("low", "medium", "high", "very_high"))
  public potential_polarization: difficultyLevelEnumType;

  @Column(DataType.ENUM("low", "medium", "high", "very_high"))
  public difficulty_level: difficultyLevelEnumType;

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

  @AllowNull(false)
  @Column
  public readonly created_at!: Date;

  @Column
  public readonly updated_at!: Date;
}

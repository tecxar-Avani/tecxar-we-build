import { Optional } from "sequelize";
import {
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  Table,
  BelongsTo,
} from "sequelize-typescript";
import {
  IBoxReviews,
  ReviewTypeEnumType,
} from "@/interfaces/box_reviews.interface";
import Boxes from "@/models/boxes.model";
import User from "./user.model";
export type Box_ReviewsGroupAttributes = Optional<IBoxReviews, "id">;

@Table({
  tableName: "box_reviews",
  timestamps: true,
})
export default class BoxReviews
  extends Model<IBoxReviews, Box_ReviewsGroupAttributes>
  implements IBoxReviews
{
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  public id: number;

  @Column(DataType.ENUM("acceptance", "resistance", "inspiration"))
  public review_type: ReviewTypeEnumType;

  @Column(DataType.TEXT)
  public comment: string;

  @AllowNull(false)
  @ForeignKey(() => Boxes)
  @Column(DataType.INTEGER)
  public box_id: number;
  @BelongsTo(() => Boxes)
  public box: Boxes;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  public created_by: number;
  @BelongsTo(() => User)
  public created_by_user: User;

  @Column(DataType.DATE)
  public created_at: Date;
}

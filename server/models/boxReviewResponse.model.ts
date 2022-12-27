/* eslint-disable prettier/prettier */
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
import Boxes from "@/models/boxes.model";
import User from "./user.model";
import VideoBuilds from "./videoBuilds.model ";
import BoxReviews from "./boxReviews.model";
import { IBoxReviewsResponse, ReviewResponseTypeEnumType } from "@/interfaces/boxReviewResponse";
export type Box_ReviewsResponseGroupAttributes = Optional<IBoxReviewsResponse, "id">;

@Table({
  tableName: "box_reviews_response",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  timestamps: true,
})
export default class BoxReviewsResponse
  extends Model<IBoxReviewsResponse, Box_ReviewsResponseGroupAttributes>
  implements IBoxReviewsResponse {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  public id: number;

  @Column(DataType.ENUM("challenge", "resolve"))
  public review_type: ReviewResponseTypeEnumType;

  @Column(DataType.TEXT)
  public comment: string;

  @Column(DataType.TINYINT)
  public is_accepted : number;

  @AllowNull(false)
  @ForeignKey(() => BoxReviews)
  @Column(DataType.INTEGER)
  public boxReview_id: number;
  @BelongsTo(() => BoxReviews)
  public boxReview: BoxReviews;



  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  public created_by: number;
  @BelongsTo(() => User)
  public created_by_user: User;

  @Column(DataType.DATE)
  public readonly createdAt!: Date;

  @Column(DataType.DATE)
  public readonly updatedAt!: Date;


}

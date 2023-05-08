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
import { IFlashCards } from "@/interfaces/flashCards.interface";
import VideoBuild from "@/models/videoBuilds.model ";
import User from "@/models/user.model";
export type Flash_CardsGroupAttributes = Optional<IFlashCards, "id">;

@Table({
  tableName: "flash_cards",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  timestamps: true,
})
export default class FlashCards
  extends Model<IFlashCards, Flash_CardsGroupAttributes>
  implements IFlashCards
{
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  public id: number;

  @AllowNull(false)
  @ForeignKey(() => VideoBuild)
  @Column(DataType.INTEGER)
  public build_id: number;

  @BelongsTo(() => VideoBuild, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    hooks: true,
  })
  public build: VideoBuild;

  @Column(DataType.TEXT)
  public question: string;

  @Column(DataType.TEXT)
  public answer: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public created_by: number;

  @BelongsTo(() => User)
  public created_by_user: User;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public previous_user?: number;
  @BelongsTo(() => User)
  public previous_user_id?: User;

  @Column(DataType.DATE)
  public readonly createdAt!: Date;

  @Column(DataType.DATE)
  public readonly updatedAt!: Date;
}

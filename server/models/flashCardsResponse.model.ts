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
  IFlashCardsResponse,
  ResponseEnumType,
} from "@/interfaces/flashCards.interface";
import FlashCards from "./flashCards.model";
export type Flash_CardsResponseGroupAttributes = Optional<
  IFlashCardsResponse,
  "id"
>;

@Table({
  tableName: "flash_cards_response",
  updatedAt: "updatedAt",
  createdAt: "createdAt",
  timestamps: true,
})
export default class FlashCardsResponse
  extends Model<IFlashCardsResponse, Flash_CardsResponseGroupAttributes>
  implements IFlashCardsResponse
{
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  public id: number;

  @AllowNull(false)
  @Column(DataType.ENUM("good", "hard", "easy", "again"))
  response_type?: ResponseEnumType;

  @AllowNull(false)
  @ForeignKey(() => FlashCards)
  @Column(DataType.INTEGER)
  public flash_card_id: number;

  @BelongsTo(() => FlashCards)
  public flashCard: FlashCards;

  @Column(DataType.INTEGER)
  created_by?: number;

  @Column(DataType.DATE)
  public readonly createdAt!: Date;

  @Column(DataType.DATE)
  public readonly updatedAt!: Date;
}

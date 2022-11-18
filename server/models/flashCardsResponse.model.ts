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
import { IFlashCardsResponse, ResponseEnumType } from "@/interfaces/flashCards.interface";
export type Flash_CardsGroupAttributes = Optional<IFlashCardsResponse, "id">;

@Table({
    createdAt: "createdAt",
    tableName: "flash_cards_response",
    timestamps: true,
})
export default class FlashCardsResponse
    extends Model<IFlashCardsResponse, Flash_CardsGroupAttributes>
    implements IFlashCardsResponse {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    public id: number;

    @AllowNull(false)
    @Column(DataType.ENUM("good", "hard", "easy", "again"))
    response_tye?: ResponseEnumType

    @Column(DataType.NUMBER)
    flash_card_id: number;

    @Column(DataType.NUMBER)
    created_by?: number;

    @Column(DataType.DATE)
    public readonly createdAt!: Date;

}

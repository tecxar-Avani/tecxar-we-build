import { Optional } from "sequelize";
import {
    Column,
    Model,
    DataType,
    AllowNull,
    ForeignKey,
    Table,
} from "sequelize-typescript";
import { IFlash_Cards } from "@/interfaces/flash_cards.interface";
import VideoBuild from "@/models/videoBuilds.model ";
import User from '@/models/user.model'
export type Flash_CardsGroupAttributes = Optional<IFlash_Cards, "id">;

@Table({
    tableName: "flash_cards",
    timestamps: true,
})
export default class FlashCards
    extends Model<IFlash_Cards, Flash_CardsGroupAttributes>
    implements IFlash_Cards {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    public id: number;

    @AllowNull(false)
    @ForeignKey(() => VideoBuild)
    @Column(DataType.INTEGER)
    public build_id: number;
    @Column(DataType.TEXT)
    public question: string;
    @Column(DataType.TEXT)
    public answer: string;
    @Column(DataType.TEXT)
    public response: string;
    @ForeignKey(()=>User)
    @Column(DataType.INTEGER)
    public created_by: number;
    @Column(DataType.DATE)
    public created_at: Date;
    @Column(DataType.DATE)
    public updated_at: Date;

}

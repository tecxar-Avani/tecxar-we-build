import { Optional } from "sequelize";
import {
    Column,
    Model,
    DataType,
    AllowNull,
    ForeignKey,
    Table,
} from "sequelize-typescript";
import { IBox_Reviews } from "@/interfaces/box_reviews.interface";
import VideoBuild from "@/models/videoBuilds.model ";
export type Box_ReviewsGroupAttributes = Optional<IBox_Reviews, "id">;

@Table({
    tableName: "box_reviews",
    timestamps: true,
})
export default class Box_Reviews
    extends Model<IBox_Reviews, Box_ReviewsGroupAttributes>
    implements IBox_Reviews {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    public id: number;

    @AllowNull(false)
    @ForeignKey(() => VideoBuild)
    @Column(DataType.TEXT)
    public review_type: string;
    @Column(DataType.TEXT)
    public comment: string;
    @Column(DataType.INTEGER)
    public created_by: number;
    @Column(DataType.INTEGER)
    public box_id: number;
    @Column(DataType.DATE)
    public created_at: Date;
    

}

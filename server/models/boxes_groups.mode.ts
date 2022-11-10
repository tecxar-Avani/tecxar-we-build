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
import { IBoxes_Groups } from "@/interfaces/boxes_groups.interface";
import VideoBuild from "@/models/videoBuilds.model ";
export type Boxes_GroupAttributes = Optional<IBoxes_Groups, "id">;

@Table({
    tableName: "boxes_groups",
    timestamps: true,
})
export default class Boxes_Groups
    extends Model<IBoxes_Groups, Boxes_GroupAttributes>
    implements IBoxes_Groups {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    public id: number;

    @AllowNull(false)
    @ForeignKey(() => VideoBuild)
    @Column(DataType.INTEGER)
    public build_id: number;
    @Column(DataType.INTEGER)
    public box_id: number;
    @Column(DataType.INTEGER)
    public group_id: number;

}

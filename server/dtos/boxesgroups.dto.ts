import { IBoxes_Groups } from "@interfaces/boxes_groups.interface";
import { IsNumber } from "class-validator";

export class BoxesgroupDto implements IBoxes_Groups {
    @IsNumber()
    id: number;

    @IsNumber()
    box_id: number;

    @IsNumber()
    group_id: number
}
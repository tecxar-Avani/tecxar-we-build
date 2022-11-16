import { IBoxesGroups,IUpdateBoxesGroups } from "@/interfaces/boxesgroups.interface";
import { IsNumber, IsOptional } from "class-validator";

export class BoxesgroupDto implements IBoxesGroups {
    @IsNumber()
    id: number;

    @IsNumber()
    box_id: number;

    @IsNumber()
    group_id: number
}

export class updateBoxesgroupDto implements IUpdateBoxesGroups {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsNumber()
    box_id?: number;

    @IsOptional()
    @IsNumber()
    group_id?: number
}
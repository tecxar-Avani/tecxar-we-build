import { IBoxes } from '@interfaces/boxes.interface';
import { IsOptional, IsString, IsDate, IsNumber } from 'class-validator';

export class BoxesDto implements IBoxes {
    @IsNumber()
    id: number;

    @IsNumber()
    build_id: number;

    @IsString()
    description: string;

    @IsNumber()
    sorting_order: number;

    @IsOptional()
    @IsDate()
    created_at?: Date;

    @IsOptional()
    @IsDate()
    updated_at?: Date
}
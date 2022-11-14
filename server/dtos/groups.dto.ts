import { IGroups } from '@interfaces/groups.interface';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class groupsDto implements IGroups {
    @IsNumber()
    id: number;

    @IsString()
    title: string;

    @IsOptional()
    @IsDate()
    created_at?: Date;

    @IsOptional()
    @IsDate()
    updated_at?: Date;
}
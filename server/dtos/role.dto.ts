import { IRole } from '@interfaces/roles.interface';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class roleDto implements IRole {
    @IsNumber()
    id: number;

    @IsString()
    role: string;

    @IsOptional()
    @IsDate()
    createdBy?: number;

    @IsOptional()
    @IsDate()
    updatedBy?: number;
}
import { IRole, IUpdateRole } from '@interfaces/roles.interface';
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

export class updateroleDto implements IUpdateRole {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsString()
    role?: string;

    @IsOptional()
    @IsDate()
    createdBy?: number;

    @IsOptional()
    @IsDate()
    updatedBy?: number;
}
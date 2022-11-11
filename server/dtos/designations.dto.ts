import { ICreateDesignation, IUpdateDesignation } from '@interfaces/designations.interface';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class createDto implements ICreateDesignation {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsString()
    name: string;

    @IsOptional()
    @IsBoolean()
    is_deleted?: boolean;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;
}

export class updateDto implements IUpdateDesignation {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsBoolean()
    is_deleted?: boolean;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;
}
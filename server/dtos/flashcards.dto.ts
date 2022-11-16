import { IFlashCards, ResponseEnumType,IUpdateFlashCards } from '@interfaces/flashCards.interface';
import { IsOptional, IsNumber, IsString, IsDate } from 'class-validator';

export class flashcardsDto implements IFlashCards {
    @IsNumber()
    id: number;

    @IsNumber()
    build_id: number;

    @IsString()
    question: string;

    @IsString()
    answer: string;

    @IsOptional()
    response: ResponseEnumType;

    @IsNumber()
    created_by: number;

    @IsDate()
    updated_at: Date;
}

export class updateflashcardsDto implements IUpdateFlashCards {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsNumber()
    build_id?: number;

    @IsOptional()
    @IsString()
    question?: string;

    @IsOptional()
    @IsString()
    answer?: string;

    @IsOptional()
    response?: ResponseEnumType;

    @IsOptional()
    @IsNumber()
    created_by?: number;

    @IsOptional()
    @IsDate()
    updated_at?: Date;
}
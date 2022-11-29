/* eslint-disable prettier/prettier */
import { IBoxReviews, ReviewTypeEnumType ,IUpdateBoxReviews} from '@/interfaces/boxreviews.interface';
import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';

export class BoxreviewDto implements IBoxReviews {
    createdAt: Date;
    @IsNumber()
    id: number;

    @IsNumber()
    box_id: number;

    @IsString()
    review_type: ReviewTypeEnumType;

    @IsString()
    comment: string;

    @IsNumber()
    created_by: number;

    @IsDate()
    created_at: Date;
}

export class updateBoxreviewDto implements IUpdateBoxReviews {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsNumber()
    box_id?: number;

    @IsOptional()
    @IsString()
    review_type?: ReviewTypeEnumType;

    @IsOptional()
    @IsString()
    comment?: string;
}
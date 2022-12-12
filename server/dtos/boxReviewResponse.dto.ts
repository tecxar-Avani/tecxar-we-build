/* eslint-disable prettier/prettier */
import { IBoxReviewsResponse, IUpdateBoxReviewsResponse, ReviewResponseTypeEnumType } from '@/interfaces/boxReviewResponse';
import { IBoxReviews, ReviewTypeEnumType, IUpdateBoxReviews } from '@/interfaces/boxreviews.interface';
import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';

export class BoxReviewResponseDto implements IBoxReviewsResponse {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNumber()
    boxReview_id: number;

    @IsString()
    review_type: ReviewResponseTypeEnumType;

    @IsString()
    comment: string;
    
    @IsNumber()
    build_id?:number

    @IsOptional()
    @IsNumber()
    created_by?: number;

    @IsOptional()
    @IsDate()
    createdAt?: Date;
}

export class updateBoxreviewResponseDto implements IUpdateBoxReviewsResponse {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsNumber()
    boxReview_id?: number;

    @IsOptional()
    @IsString()
    review_type?: ReviewResponseTypeEnumType;

    @IsOptional()
    @IsString()
    comment?: string;
}
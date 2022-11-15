import { IBoxReviews, ReviewTypeEnumType } from '@interfaces/box_reviews.interface';
import { IsNumber, IsString, IsDate } from 'class-validator';

export class BoxReviewDto implements IBoxReviews {
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

}
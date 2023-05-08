/* eslint-disable prettier/prettier */

export enum ReviewResponseTypeEnumType {
    challenge = "Challenge",
    resolve = "Resolve",
  }
  
  export interface IBoxReviewsResponse {
    id?: number;
    boxReview_id: number;
    review_type: ReviewResponseTypeEnumType;
    comment: string;
    created_by?: number;
    createdAt?: Date;
    is_accepted?:number;
  }
  
  
  export interface IUpdateBoxReviewsResponse {
    id?: number;
    boxReview_id?: number;
    review_type?: ReviewResponseTypeEnumType;
    comment?: string;
    created_by?: number;
    is_accepted?:number;
  }
  
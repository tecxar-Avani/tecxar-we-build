/* eslint-disable prettier/prettier */

export enum ReviewTypeEnumType {
  acceptance = "acceptance",
  resistance = "resistance",
  inspiration = "inspiration",
}

export interface IBoxReviews {

  id: number;
  box_id: number;
  review_type: ReviewTypeEnumType;
  comment: string;
  created_by: number;
  createdAt: Date;

}

export interface IUpdateBoxReviews {
  id?: number;
  box_id?: number;
  review_type?: ReviewTypeEnumType;
  comment?: string;
  created_by?: number;
}

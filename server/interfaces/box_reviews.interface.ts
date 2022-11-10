
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
  created_at: Date;
}

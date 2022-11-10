export enum VideoTypeEnumType {
  halfDay = "theory",
  fullDay = "practical",
}
export enum difficultyLevelEnumType {
  low = "low",
  medium = "medium",
  high = "high",
  veryHigh = "very_high",
}

export interface IVideoBuild {
  id: number;
  video_url: string;
  provider?: string;
  type_of_video?: VideoTypeEnumType;
  potential_polarization?: difficultyLevelEnumType;
  difficulty_level?: difficultyLevelEnumType;
  created_by: number;
  updated_by?: number;
  created_at: Date;
  updated_at?: Date;
}

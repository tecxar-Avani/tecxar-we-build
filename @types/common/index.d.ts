interface ICustomerCredentials {
  email: string;
  password: string;
}

type difficultyLevelEnumType = "low" | "medium" | "high" | "very_high";
type VideoTypeEnumType = "theory" | "practical";
type ResponseEnumType = "good"| "hard"| "easy"| "again"

export interface IVideoBuild {
  id?: number;
  video_url: string;
  provider?: string;
  type_of_video: VideoTypeEnumType;
  potential_polarization: difficultyLevelEnumType;
  difficulty_level: difficultyLevelEnumType;
  created_by?: number;
  updated_by?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFlashCard {
  id?: number;
  build_id?: number;
  question: string;
  answer: string;
  created_by?: number;
  updated_by?:number;
  updatedAt?: Date;
}
export interface ICreateFlashCard{
  question: string;
  answer: string;
}
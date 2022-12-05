interface ICustomerCredentials {
  email: string;
  password: string;
}

type difficultyLevelEnumType = "low" | "medium" | "high" | "very_high";
type VideoTypeEnumType = "theory" | "practical";
type ResponseEnumType = "good"| "hard"| "easy"| "again"
type ReviewTypeEnumType = "Acceptance" | "Resistance" | "Inspiration"


export interface IVideoBuild {
  id?: number;
  video_url?: string;
  provider?: string;
  type_of_video?: VideoTypeEnumType;
  potential_polarization?: difficultyLevelEnumType;
  difficulty_level?: difficultyLevelEnumType;
  created_by?: number;
  updated_by?: number;
  createdAt?: Date;
  updatedAt?: Date;
  rows?:any
}

export interface IBuild {
  answer?:string
  email?: string
  id?: number
  question?:string
  tag_line?: string
  user_id?: number
  user_name?: string
}

export interface IBuildUser {
user_id: number
user_name: string
}
export interface IFlashCard {
  id?: number;
  build_id?: number;
  question: string;
  answer: string;
  created_by?: number;
  updated_by?: number;
  updatedAt?: Date;
  user_id?:number
  flashBuild?: {
    build: IBuild[],
    users: IBuildUser[]
  }
}


export interface IBoxReviews {
  id?: number;
  box_id: number;
  review_type: ReviewTypeEnumType;
  comment: string;
  created_by?: number;
  createdAt?: Date;
}
export interface ICreateFlashCard{
  question: string;
  answer: string;
}

export interface IBoxes {
  id?: number;
  build_id?: number;
  description: string;
  sorting_order?: number;
  createdAt?:Date;
  updatedAt?:Date
}


export interface ICurrentUser {
  id?: number;
  first_name?: string | null;
  last_name?: string;
  email?: string;
  role_id?: number;
  profile_image?: string | File | null;
}
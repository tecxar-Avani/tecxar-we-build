interface ICustomerCredentials {
  email: string;
  password: string;
}

type difficultyLevelEnumType = "low" | "medium" | "high" | "very_high";
type VideoTypeEnumType = "theory" | "practical";
type ResponseEnumType = "good" | "hard" | "easy" | "again";
type ReviewTypeEnumType = "Acceptance" | "Resistance" | "Inspiration";

export interface IVideoBuild {
  id?: number;
  video_url?: string;
  provider?: string;
  type_of_video?: any;
  potential_polarization?: any;
  difficulty_level?: any;
  description?: any;
  duration?:string;
  created_by?: number;
  updated_by?: number;
  boxes?:any;
  createdAt?: Date;
  updatedAt?: Date;
  rows?: any;
}


export interface IBuild {
  answer?: string;
  email?: string;
  id?: number;
  question?: string;
  tag_line?: string;
  user_id?: number;
  user_name?: string;
}

export interface IBuildUser {
  user_id: number;
  user_name: string;
}
export interface IFlashCard {
  id?: number;
  build_id?: number;
  question: string;
  answer: string;
  created_by?: number;
  updated_by?: number;
  updatedAt?: Date;
  user_id?: number;
  flashBuild?: {
    build: IBuild[];
    users: IBuildUser[];
  };
}
export interface IFlashCardsResponse {
  id?: number;
  response_type?: ResponseEnumType;
  flash_card_id?: number;
  created_by?: number;
  createdAt?: Date;
  build_id?:number;
}
export interface IUpdateFlashCards {
  id?: number;
  build_id?: number;
  question?: string;
  answer?: string;
  created_by?: number;
  updatedAt?: Date;
}

export interface IBoxReviews {
  id?: number;
  box_id?: number;
  review_type?: ReviewTypeEnumType;
  comment?: string;
  created_by?: number;
  createdAt?: Date;
  build_id?:number;
  is_accepted?:number;
}
export interface ICreateFlashCard {
  question: string;
  answer: string;
}

export interface IBoxes {
  id?: number;
  build_id?: number;
  description?: string;
  sorting_order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICurrentUser {
  id?: number;
  first_name?: string | null;
  last_name?: string;
  email?: string;
  role_id?: number;
  profile_image?: string | File | null;
}

export interface ICreateUser {
  id?: number;
  role_id?: number;
  user_name?: string;
  tag_line?: string;
  email?: string;
  profile_id?: string;
  is_blocked?: number;
  profile_image?: any;
  updated_by?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IUpdateUser {
  id?: number;
  user_name?: string;
  tag_line?: string;
  is_blocked?: number;
  profile_image?: any;
  updated_by?: number;
  updatedAt?: Date;
}

export interface IBoxReviewsResponse {
  id?: number;
  boxReview_id?: number;
  review_type?: ReviewResponseTypeEnumType;
  comment?: string;
  created_by?: number;
  createdAt?: Date;
 build_id?:number;
}

export interface IUpdateBoxReviewsResponse {
  id?: number;
  boxReview_id?: number;
  review_type?: ReviewResponseTypeEnumType;
  comment?: string;
  created_by?: number;
  createdAt?: Date;
 build_id?:number;
 is_accepted?:number;
}


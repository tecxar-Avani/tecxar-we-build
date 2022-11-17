interface ICustomerCredentials {
  email: string;
  password: string;
}

type difficultyLevelEnumType = "low" | "medium" | "high" | "very_high";
type VideoTypeEnumType = "theory" | "practical";


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
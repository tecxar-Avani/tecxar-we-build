/* eslint-disable prettier/prettier */
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
  id?: number;
  video_url: string;
  provider?: string;
  type_of_video?: any;
  potential_polarization?: any;
  difficulty_level?: any;
  description?: any;
  video_description?:string;
  duration?: string;
  new_video_id?: string;
  published_at?: string;
  thumbnails?: any;
  title?: string;
  embed_url?: any;
  video_id?: string;
  created_by?: number;
  updated_by?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUpdateVideoBuild {
  id?: number;
  video_url?: string;
  provider?: string;
  type_of_video?: any;
  potential_polarization?: any;
  difficulty_level?: any;
  updated_by?: number;
  updatedAt?: Date;
  video_description?:string;
}

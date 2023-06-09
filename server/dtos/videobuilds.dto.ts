/* eslint-disable prettier/prettier */
import {
  IVideoBuild,
  IUpdateVideoBuild,
} from "@interfaces/videoBuilds.interface";
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class videoBuildDto implements IVideoBuild {
  @IsString()
  video_url: string;

  @IsOptional()
  @IsString()
  provider?: string;

  @IsOptional()
  @IsString()
  type_of_video: any;

  @IsOptional()
  @IsString()
  potential_polarization: any;

  @IsOptional()
  @IsString()
  difficulty_level: any;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  video_description:string;

  @IsOptional()
  @IsString()
  duration: string;

  @IsOptional()
  @IsString()
  new_video_id: string;

  @IsOptional()
  @IsString()
  published_at: string;

  @IsOptional()
  thumbnails: any;

  @IsOptional()
  title: any;

  @IsOptional()
  @IsString()
  embed_url: string;

  @IsOptional()
  @IsString()
  video_id: string;

  @IsOptional()
  @IsArray()
  boxes?: any;

  @IsOptional()
  @IsArray()
  flashCards?: any;

  @IsOptional()
  @IsNumber()
  created_by: number;

  @IsOptional()
  @IsNumber()
  updated_by?: number;
}

export class updateVideoBuildDto implements IUpdateVideoBuild {
  [x: string]: any;
  @IsOptional()
  @IsString()
  video_url?: string;

  @IsOptional()
  @IsString()
  provider?: string;

  @IsOptional()
  @IsString()
  type_of_video?: any;

  @IsOptional()
  @IsString()
  potential_polarization?: any;

  @IsOptional()
  @IsString()
  difficulty_level?: any;

  
  @IsOptional()
  @IsString()
  video_description:string;

  @IsOptional()
  boxes?: any;

  @IsOptional()
  @IsNumber()
  updated_by?: number;
}

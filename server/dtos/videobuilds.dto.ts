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
  @IsArray()
  boxes?: any;

  @IsOptional()
  @IsNumber()
  updated_by?: number;
}

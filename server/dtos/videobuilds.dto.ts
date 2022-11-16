import { IBoxes } from "@/interfaces/boxes.interface";
import {
  IVideoBuild,
  difficultyLevelEnumType,
  VideoTypeEnumType,
  IUpdateVideoBuild,
} from "@interfaces/videoBuilds.interface";
import {
  IsArray,
  IsDate,
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

  @IsString()
  type_of_video: VideoTypeEnumType;

  @IsString()
  potential_polarization: difficultyLevelEnumType;

  @IsString()
  difficulty_level: difficultyLevelEnumType;

  @IsOptional()
  @IsArray()
  boxes?: any;

  @IsOptional()
  @IsNumber()
  created_by: number;

  @IsOptional()
  @IsNumber()
  updated_by?: number;
}

export class updateVideoBuildDto implements IUpdateVideoBuild {
  @IsOptional()
  @IsString()
  video_url?: string;

  @IsOptional()
  @IsString()
  provider?: string;

  @IsOptional()
   @IsString()
  type_of_video?: VideoTypeEnumType;

  @IsOptional()
   @IsString()
  potential_polarization?: difficultyLevelEnumType;

  @IsOptional()
  @IsString()
  difficulty_level?: difficultyLevelEnumType;

  @IsOptional()
  @IsArray()
  boxes?: any;

  @IsOptional()
  @IsNumber()
  updated_by?: number;
}

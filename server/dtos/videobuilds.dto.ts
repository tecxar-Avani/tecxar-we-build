import { IVideoBuild, difficultyLevelEnumType, VideoTypeEnumType } from '@interfaces/videoBuilds.interface';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class videoBuildDto implements IVideoBuild {
  @IsString()
  video_url: string;

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

  @IsNumber()
  created_by: number;

  @IsOptional()
  @IsNumber()
  updated_by?: number;

  //   @IsDate()
  //   created_at: Date;

  //   @IsOptional()
  //   @IsDate()
  //   updated_at?: Date;
}
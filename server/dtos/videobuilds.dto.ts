import { IVideoBuild, difficultyLevelEnumType, VideoTypeEnumType } from '@interfaces/videoBuilds.interface';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class videobuildDto implements IVideoBuild {
    @IsNumber()
    id: number;

    @IsString()
    video_url: string;

    @IsOptional()
    @IsString()
    provider?: string;

    @IsOptional()
    type_of_video?: VideoTypeEnumType;

    @IsOptional()
    potential_polarization?: difficultyLevelEnumType;

    @IsOptional()
    difficulty_level?: difficultyLevelEnumType;

    @IsNumber()
    created_by: number;

    @IsOptional()
    @IsNumber()
    updated_by?: number;

    @IsDate()
    created_at: Date;

    @IsOptional()
    @IsDate()
    updated_at?: Date;
}
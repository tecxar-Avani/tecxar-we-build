import { ICreateDesignation, IUpdateDesignation } from '@/interfaces/designations.interface';
import { IsBoolean, IsOptional, IsString, IsDate, IsNumber } from 'class-validator';
import { DatabaseObjectDto } from './baseObject.dto';
export class DesignationDto extends DatabaseObjectDto implements ICreateDesignation {
  @IsString()
  public name: string;

  @IsOptional()
  @IsBoolean()
  is_deleted?: boolean;

  @IsOptional()
  @IsDate()
  public createdAt?: Date;

  @IsOptional()
  @IsDate()
  public updatedAt?: Date;
}

export class UpdateDesignationDto extends DatabaseObjectDto implements IUpdateDesignation {
  @IsOptional()
  @IsNumber()
  @IsOptional()
  public id?: number;

  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsBoolean()
  public is_deleted?: boolean;

  @IsOptional()
  @IsDate()
  public createdAt?: Date;

  @IsOptional()
  @IsDate()
  public updatedAt?: Date;

}

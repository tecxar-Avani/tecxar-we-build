/* eslint-disable prettier/prettier */
import { ICreateUser, IUpdateUser } from '@/interfaces/users.interface';
import { IsOptional, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateUserDto implements ICreateUser {
  @IsOptional()
  @IsNumber()
  public id: number;

  @IsNumber()
  role_id: number;

  @IsOptional()
  @IsString()
  user_name: string;

  @IsOptional()
  @IsString()
  tag_line?: string;

  @IsString()
  email: string;

  @IsString()
  profile_id: string;

  @IsOptional()
  @IsNumber()
  is_blocked: number;

  @IsOptional()
  profile_image?: any;

  @IsOptional()
  @IsNumber()
  updated_by?: number;

  @IsOptional()
  @IsDate()
  public createdAt?: Date;

  @IsOptional()
  @IsDate()
  public updatedAt?: Date;
}

export class UpdateUserDto implements IUpdateUser {
  @IsOptional()
  @IsString()
  user_name?: string;

  @IsOptional()
  @IsString()
  tag_line?: string;

  @IsOptional()
  @IsNumber()
  is_blocked?: number;

  @IsOptional()
  profile_image?: any;

  @IsOptional()
  @IsNumber()
  updated_by?: number;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

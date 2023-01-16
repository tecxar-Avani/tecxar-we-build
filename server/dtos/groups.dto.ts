/* eslint-disable prettier/prettier */
import { IGroups, IUpdateGroups } from "@interfaces/groups.interface";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class groupsDto implements IGroups {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsDate()
  created_at?: Date;

  @IsOptional()
  @IsDate()
  updated_at?: Date;
}

export class updateGroupsDto implements IUpdateGroups {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDate()
  updated_at?: Date;
}

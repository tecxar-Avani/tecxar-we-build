/* eslint-disable prettier/prettier */
import { IFlashCards, IUpdateFlashCards, IFlashCardsResponse, ResponseEnumType } from '@interfaces/flashCards.interface';
import { IsOptional, IsNumber, IsString, IsDate } from 'class-validator';

export class flashcardsDto implements IFlashCards {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsNumber()
  build_id?: number;

  @IsString()
  question: string;

  @IsString()
  answer: string;

  @IsOptional()
  @IsNumber()
  created_by?: number;

  @IsOptional()
  @IsDate()
  updated_at?: Date;

  @IsOptional()
  @IsNumber()
  previous_user?:number
}

export class updateflashcardsDto implements IUpdateFlashCards {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsNumber()
  build_id?: number;

  @IsOptional()
  @IsString()
  question?: string;

  @IsOptional()
  @IsString()
  answer?: string;

  @IsOptional()
  @IsNumber()
  created_by?: number;

  @IsOptional()
  @IsDate()
  updated_at?: Date;
}

export class flashCardResponseDto implements IFlashCardsResponse {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  response_type: ResponseEnumType;

  @IsNumber()
  flash_card_id: number;

  @IsOptional()
  @IsNumber()
  created_by?: number;

  @IsOptional()
  @IsDate()
  created_at: Date;

  @IsOptional()
  @IsDate()
  updated_at?: Date;
}
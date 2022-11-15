import { IFlashCards, ResponseEnumType } from '@interfaces/flashCards.interface';
import { IsOptional, IsNumber, IsString, IsDate } from 'class-validator';

export class flashcardsDto implements IFlashCards {
  @IsNumber()
  id: number;

  @IsNumber()
  build_id: number;

  @IsString()
  question: string;

  @IsString()
  answer: string;

  @IsOptional()
  response: ResponseEnumType;

  @IsOptional()
  @IsNumber()
  created_by: number;

  @IsOptional()
  @IsNumber()
  updated_by: number;
}
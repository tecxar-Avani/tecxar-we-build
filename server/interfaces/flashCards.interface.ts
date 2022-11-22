import User from "@/models/user.model";

export enum ResponseEnumType {
  again = "again",
  good = "good",
  hard = "hard",
  easy = 'easy'
};

export interface IFlashCardsResponse {
  id?: number;
  response_type?: ResponseEnumType;
  flash_card_id: number;
  created_by?: number;
  createdAt?: Date
}

export interface IFlashCards {
  id?: number;
  build_id: number;
  question: string;
  answer: string;
  created_by?: number;
  updated_by?: number;
  updatedAt?: Date;
}

export interface IUpdateFlashCards {
  id?: number;
  build_id?: number;
  question?: string;
  answer?: string;
  created_by?: number;
  updatedAt?: Date;
}

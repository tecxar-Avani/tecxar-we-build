export enum ResponseEnumType {
  again = "again",
  good = "good",
  hard = "hard",
  easy='easy'
};

export interface IFlashCards {
  id: number;
  build_id: number;
  question: string;
  answer: string;
  response: ResponseEnumType;
  created_by: number;
  updated_by?:number;
  updatedAt?: Date;
}

export interface IUpdateFlashCards {
  id?: number;
  build_id?: number;
  question?: string;
  answer?: string;
  response?: ResponseEnumType;
  created_by?: number;
  updatedAt?: Date;
}

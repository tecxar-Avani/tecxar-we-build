import { Request } from "express";
import { ICreateUser } from "./users.interface";

export interface DataStoredInToken {
  id: number;
  email: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: ICreateUser;
}

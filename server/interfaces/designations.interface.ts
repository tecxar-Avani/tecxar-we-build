import { DatabaseObject } from "./baseObject.interface";

export interface ICreateDesignation extends DatabaseObject {
    id?: number;
    name: string;
    is_deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IUpdateDesignation {
    id?: number;
    name?: string;
    is_deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
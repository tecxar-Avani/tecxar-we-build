
export interface ICreateDesignation  {
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
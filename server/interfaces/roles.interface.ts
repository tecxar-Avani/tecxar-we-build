export interface IRole {
  id: number;
  role: string;
  createdBy?: number;
  updatedBy?: number;
}

export interface IUpdateRole {
  id?: number;
  role?: string;
  createdBy?: number;
  updatedBy?: number;
}

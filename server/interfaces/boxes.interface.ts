export interface IBoxes {
  id?: number;
  build_id?: number;
  description?: string;
  sorting_order?: number;
  createdAt?: Date;
  updatedAt?: Date
}

export interface IUpdateBoxes {
  id?: number;
  build_id?: number;
  description?: string;
  sorting_order?: number;
  updatedAt?: Date
}

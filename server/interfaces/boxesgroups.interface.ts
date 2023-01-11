/* eslint-disable prettier/prettier */
export interface IBoxesGroups {
  id?: number;
  box_id?: number;
  group_id?: number;
}
export interface IUpdateBoxesGroups {
  id?: number;
  box_id?: number;
  group_id?: number;
}

export interface IGroupBoxData {
  title?:string;
  group_id?:number;
  build_id?:number;
  box_id?:number;
  description?:string;
  sorting_order?:number;
}
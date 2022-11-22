export interface IGroups {
  id: number;
  title: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface IUpdateGroups {
  id?: number;
  title?: string;
  updated_at?: Date;
}
  
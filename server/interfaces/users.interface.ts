export interface ICreateUser {
  id?: number;
  role_id: number;
  user_name?: string;
  tag_line?: string;
  email: string;
  profile_id: string;
  is_blocked?: number;
  profile_image?: any;
  updated_by?: number;
  created_at?: Date;
  updated_at?: Date;
}
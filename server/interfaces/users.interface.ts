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
  createdAt?: Date;
  updatedAt?: Date;
}


export interface IUpdateUser {
  user_name?: string;
  tag_line?: string;
  is_blocked?: number;
  profile_image?: any;
  updated_by?: number;
  updatedAt?: Date;
}

export interface IFailedResponse {
  error: {
    title: string;
    message: string;
    redirect?: string;
  };
  status: boolean;
}
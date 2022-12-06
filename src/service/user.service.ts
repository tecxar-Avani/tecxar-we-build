import API from "../plugins/api";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

class UserService {
  userAuthentication() {
    return API.get(`/auth/`);
  }

  getUserByMail() {
    return API.get(`/users/userByEmail`)
  }
  updateUserById(id:number,userData:any){
  
    return API.put(`/users/${id}`,userData)
  }
  boxDataByUserId(){
    return API.get(`/users/`)
  }
}
export default new UserService();

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
  
    console.log(userData)
    return API.put(`/users/${id}`,userData)
  }

}
export default new UserService();

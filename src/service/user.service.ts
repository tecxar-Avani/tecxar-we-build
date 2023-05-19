import API from "../plugins/api";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";


class UserService {
  userAuthentication() {
    return API.get(`/auth/`);
  }

  getAllUsers() {
    return API.get(`/users/`);
  }

  getUserByMail() {
    return API.get(`/users/userByEmail`);
  }
  updateUserById(id: number, userData: any) {
    return API.put(`/users/update/${id}`, userData);
  }

  totalbuilds() {
    return API.get(`/build/totalbuilds`);
  }
  logOut() {
    return API.get(`/logout`);
  }
  // googleCallBack(headers: AxiosRequestHeaders) {
  //   return API.get(`/google_callback`,{headers})
  // }
}
export default new UserService();

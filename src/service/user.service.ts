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
}
export default new UserService();

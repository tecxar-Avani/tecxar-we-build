import API from "../plugins/api";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

class UserService {
  userAuthentication() {
    return API.get(`/auth/`);
  }

  getUserByMail() {
    return API.get(`/users/userByEmail`)
  }
}
export default new UserService();

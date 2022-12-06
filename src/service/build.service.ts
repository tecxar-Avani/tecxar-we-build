import API from "../plugins/api";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

class BuildService {
  listBuilds() {
    return API.get(`/build/getAllBuilds`);
  }

  getUserInteractedBuild() {
    return API.get(`/build/userInteractedBuild`);
  }

  getBuildById(id:number) {
    return API.get(`/build/${id}`);
  }
  // listBuilds(url: any) {
  //   const urlData = url ? url : "node js tutorial";
  //   return axios.get(
  //     `https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${urlData}`,

  //     {
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "6f91626421mshe80ebf80a6304bcp18f2e4jsn8b06a46b1c12",

  //         "X-RapidAPI-Host": "youtube-search-results.p.rapidapi.com",
  //       },
  //     }
  //   );
  // }

  addBuild(buildData: any) {
    return API.post(`/build/create`, buildData);
  }
}
export default new BuildService();

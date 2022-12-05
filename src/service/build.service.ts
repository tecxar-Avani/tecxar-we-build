import API from "../plugins/api";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

class BuildService {
  // listBuilds(
  //   url: any,
  // ) {
  //   return API.get(`/build/url?url=${url}`);
  // }

  listBuilds(url: any) {
    const urlData = url ? url : "node js tutorial";
    return axios.get(
      `https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${urlData}`,

      {
        headers: {
          "X-RapidAPI-Key":
            "6f91626421mshe80ebf80a6304bcp18f2e4jsn8b06a46b1c12",

          "X-RapidAPI-Host": "youtube-search-results.p.rapidapi.com",
        },
      }
    );
  }

  addBuild(buildData: any) {
    return API.get(`/build/create`, buildData);
  }
}
export default new BuildService();

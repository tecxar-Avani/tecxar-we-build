import API from "../plugins/api";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
class VideoCardService {
  addVideoCard(videocard: any) {
    return API.post(`/flashcard/create`, videocard);
  }

  VideoCardList() {
    // return API.get(`/flashcard/get`, videocard);
    return axios.get(
      "https://youtube-search-results.p.rapidapi.com/youtube-search/?q=justin+bieber",
      {
        headers: {
          "X-RapidAPI-Key":
            "6f91626421mshe80ebf80a6304bcp18f2e4jsn8b06a46b1c12",
          "X-RapidAPI-Host": "youtube-search-results.p.rapidapi.com",
        },
      }
    );
  }
}
export default new VideoCardService();

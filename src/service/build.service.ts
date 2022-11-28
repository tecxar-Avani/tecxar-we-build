import API from "../plugins/api";
class BuildService {

  listBuilds(
    url: any,
  ) {
    return API.get(`/build/url?url=${url}`);
  }

  // addBoxReviews(boxData: any) {
  //   return API.post(`/build/create`, boxData);
  // }
}
export default new BuildService();

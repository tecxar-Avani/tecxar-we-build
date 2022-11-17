import API from "../plugins/api";
class BuildService {

  listBuilds(
    url: any,
  ) {
    return API.get(`/build/url?url=${url}`);
  }
}
export default new BuildService();

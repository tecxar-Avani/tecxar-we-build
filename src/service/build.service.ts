import API from "../plugins/api";
class BuildService {

  listBuilds(
    url: any,
  ) {
    return API.get(`/build/url?url=${url}`);
  }

  addBuild(
    buildData :any,
  ){
    return API.get(`/build/create`,buildData)
  }
}
export default new BuildService();

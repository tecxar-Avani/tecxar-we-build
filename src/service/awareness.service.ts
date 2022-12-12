import API from "../plugins/api";
class AwarenessService {
  addAwareness(awareness: any) {
    return API.post(`/reviews/create`, awareness);
  }

  getAwarenessByBoxId(buildId:number) {
    return API.get(`/reviews/getReviewsByBoxId/${buildId}`);
  }
 }
export default new AwarenessService();

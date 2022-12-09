import API from "../plugins/api";
class AwarenessService {
  addAwareness(awareness: any) {
    return API.post(`/reviews/create`, awareness);
  }

  getAwarenessByBoxId(boxId:number,reviewType:string) {
    return API.get(`/reviews/getReviewsByBoxId?boxId=${boxId}&reviewType=${reviewType}`);
  }
 }
export default new AwarenessService();

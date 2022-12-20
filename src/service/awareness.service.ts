import API from "../plugins/api";
class AwarenessService {
  addAwareness(awareness: any) {
    return API.post(`/reviews/create`, awareness);
  }

  getAwarenessByBoxId(buildId:number | undefined) {
    return API.get(`/reviews/getReviewsByBoxId/${buildId}`);
  }

  createReviewResponse(reviewResponse:any){
    return API.post(`/reviewResponse/create`,reviewResponse)
  }

  getReviewsResponse(){
    return API.get(`/reviewResponse/`)
  }

  getReviewsResponseByAwareness(review_id:number | undefined){
    return API.get(`/reviewResponse/${review_id}`)
  }
 }
export default new AwarenessService();

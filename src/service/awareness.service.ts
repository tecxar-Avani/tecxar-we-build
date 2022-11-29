import API from "../plugins/api";
class AwarenessService {
  addAwareness(awareness: any) {
    return API.post(`/reviews/create`, awareness);
  }

//   getFlashCardByBuildId(id: number) {
    
//     return API.get(`/flashcard/flashcardbybuild/${id}`);
//   }
 }
export default new AwarenessService();

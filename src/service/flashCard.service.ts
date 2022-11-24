import API from "../plugins/api";
class FlashCardService {
  addFlashCard(flashcard: any) {
    return API.post(`/flashcard/create`, flashcard);
  }

  getFlashCardByBuildId(id: number) {
    
    return API.get(`/flashcard/flashcardbybuild/${id}`);
  }
}
export default new FlashCardService();

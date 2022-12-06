import API from "../plugins/api";
class FlashCardService {
  addFlashCard(flashcard: any) {
    return API.post(`/flashcard/create`, flashcard);
  }

  getFlashCardByUser() {
    return API.get(`/flashcard/`);
  }
  
  getFlashCardByBuildId(id: number) {
    return API.get(`/flashcard/flashcardByBuild/${id}`);
  }

  updateFlashCardById(id:number) {
    return API.post(`/flashcard/${id}`);
  }
}
export default new FlashCardService();

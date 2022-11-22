import API from "../plugins/api";
class FlashCardService {
  addFlashCard(flashcard: any) {
    return API.post(`/flashcard/create`, flashcard);
  }

  FlashCardList(flashcard: any) {
    return API.get(`/flashcard/get`, flashcard);
  }
}
export default new FlashCardService();

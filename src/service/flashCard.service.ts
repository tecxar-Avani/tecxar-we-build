import API from "../plugins/api";
class FlashCardService {
  addFlashCard(flashcard: any) {
    return API.post(`/flashcard/create`, flashcard);
  }

  FlashCardList() {
    return API.get(`/flashcard`);
  }
}
export default new FlashCardService();

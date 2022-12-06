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

  updateFlashCardById(id:number,data:any) {
    return API.put(`/flashcard/${id}`,data);
  }
deleteFlashCardById(id:any){
  return API.delete(`/flashcard/${id}`);
}

}
export default new FlashCardService();

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

  getFlashCardDeck(id:number){
    return API.get(`/flashcard/flashCardDeck/${id}`);
  }

  addFlashcardresponse(flashCradResponseData:any){
    return API.post(`/flashcard/flashcardresponse`,flashCradResponseData)
  }

  addFlashCardDeck(flashCardDeck:any){
    return API.post(`/flashcard/deck`, flashCardDeck);
  }

  updateFlashCardById(id: number, data: any) {
    return API.put(`/flashcard/${id}`, data);
  }
 
deleteFlashCardById(id:any){
  return API.delete(`/flashcard/deleteFlashCard/${id}`);
}

}
export default new FlashCardService();

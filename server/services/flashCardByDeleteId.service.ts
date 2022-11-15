import {IFlashCards } from "@/interfaces/flashCards.interface";
import DB from "@databases";

class FlashCardByDeleteId {
  private flashCard = DB.flashCards;

  public async delFlashCardByDeleteId(id:number): Promise<IFlashCards | null> {
    const flashCardByDelete: any | null = await this.flashCard.destroy({
       where:{id:id},  
    });
    if (!flashCardByDelete) {
      return null;
    } else {
      return flashCardByDelete;
    }
  }
}
export default FlashCardByDeleteId;

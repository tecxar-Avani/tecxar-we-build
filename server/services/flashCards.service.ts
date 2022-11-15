
import {IFlashCards } from "@/interfaces/flashCards.interface";
import DB from "@databases";

class FlashCardService {
  private flashCard = DB.flashCards;

  public async getFlashCard(userId:number): Promise<IFlashCards[] | null> {
    const flashCards: IFlashCards[] | null = await this.flashCard.findAll({
          where:{created_by:userId},
      raw:true
    });
    if (!flashCards) {
      return null;
    } else {
      return flashCards;
    }
  }
  
}

export default FlashCardService;


import {IFlashCards } from "@/interfaces/flashCards.interface";
import DB from "@databases";

class FlashCardService {
  private FlashCards = DB.flashCards;

  public async getFlashCard(userId:number): Promise<IFlashCards[] | null> {
    const FlashCards: IFlashCards[] | null = await this.FlashCards.findAll({
         where:{created_by:userId},
      raw:true
    });
    if (!FlashCards) {
      return null;
    } else {
      return FlashCards;
    }
  }
  
}

export default FlashCardService;

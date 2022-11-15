
import { HttpException } from "@/exceptions/HttpException";
import {IFlashCards } from "@/interfaces/flashCards.interface";
import DB from "@databases";
import { isEmpty } from "class-validator";

class FlashCardService {
  private flashCard = DB.flashCards;

  public async createFlashCard(cardData: IFlashCards): Promise<IFlashCards | null> {
    if (isEmpty(cardData)) {
      throw new HttpException(400, "Enter the card data");
    }
    const createCardData: IFlashCards | null = await this.flashCard.create(
      { ...cardData },
      { raw: true }
    );
    return createCardData;
  }

  public async getFlashCard(userId: number): Promise<IFlashCards[] | null> {
    const flashCards: IFlashCards[] | null = await this.flashCard.findAll({
      where: { created_by: userId },
      raw: true,
    });
    if (!flashCards) {
      return null;
    } else {
      return flashCards;
    }
  }
}

export default FlashCardService;

import { HttpException } from "@/exceptions/HttpException";
import { IFlashCards, IFlashCardsResponse } from "@/interfaces/flashCards.interface";
import FlashCards from "@/models/flashCards.model";
import DB from "@databases";
import { isEmpty } from "class-validator";

class FlashCardService {
  private flashCard = DB.flashCards;
  private flashCardsResponse = DB.flashCardsResponse
  public async createFlashCard(
    cardData: IFlashCards
  ): Promise<IFlashCards | null> {
    if (isEmpty(cardData)) {
      throw new HttpException(400, "Enter the card data");
    }
    const createCardData: IFlashCards | null = await this.flashCard.create(
      { ...cardData },
      { raw: true }
    );
    return createCardData;
  }

  public async createFlashCardResponse(
    cardNewData: IFlashCardsResponse
  ): Promise<IFlashCardsResponse | null> {
    if (isEmpty(cardNewData)) {
      throw new HttpException(400, "Enter the card data");
    }
    const createFlashCardResponse: IFlashCardsResponse | null = await this.flashCardsResponse.create(
      { ...cardNewData },
      { raw: true }
    );
    return createFlashCardResponse;
  }

  public async createBulkFlashCard(
    cardData: IFlashCards | any
  ): Promise<IFlashCards[] | null> {
    if (isEmpty(cardData)) {
      throw new HttpException(400, "Enter the flash card data");
    }
    const createCardData: IFlashCards[] = await this.flashCard.bulkCreate(
      cardData
    );
    return createCardData;
  }

  public async getFlashCardResponse(userid:number): Promise<IFlashCardsResponse[] | null> {
    const flashCardsResponse: IFlashCardsResponse[] | null = await this.flashCardsResponse.findAll({
    //  include:[{model:FlashCards,through:{
    //   attributes:[],as:'flashCard',
    //   where:{id:userid}
    //  }}]
       //where:{id:userid},
       include:{model:FlashCards,required:true,attributes:[],as:'flashCard'},
       logging:console.log
    })

    if (!flashCardsResponse) {
      return null;
    } else {
      return flashCardsResponse;
    }
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

  public async getFlashCardBuildId(buildId: number): Promise<IFlashCards[] | null> {
    const flashCardsBuildId: IFlashCards[] | null = await this.flashCard.findAll({
      where: { build_id: buildId },
      raw: true
    });
    if (!flashCardsBuildId) {
      return null;
    } else {
      return flashCardsBuildId;
    }
  }

  public async updateFlashCardId(id: number, data): Promise<IFlashCards | null> {
    const flashCardByUpdate: any | null = await this.flashCard.update({ ...data },
      { where: { id: id } }
    );
    if (!flashCardByUpdate) {
      return null;
    } else {
      return flashCardByUpdate;
    }
  }

  public async deleteFlashCardById(id: number): Promise<IFlashCards | null> {
    const flashCardByDelete: any | null = await this.flashCard.destroy({
      where: { id: id },
    });
    if (!flashCardByDelete) {
      return null;
    } else {
      return flashCardByDelete;
    }
  }

}
export default FlashCardService;

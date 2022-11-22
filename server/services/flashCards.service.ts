import { HttpException } from "@/exceptions/HttpException";
import { IFlashCards, IFlashCardsResponse } from "@/interfaces/flashCards.interface";
import FlashCards from "@/models/flashCards.model";
import FlashCardsResponse from "@/models/flashCardsResponse.model";
import User from "@/models/user.model";
import DB from "@databases";
import { isEmpty } from "class-validator";
import { logging } from "googleapis/build/src/apis/logging";
import { where } from "sequelize";

class FlashCardService {
  private flashCard = DB.flashCards;
  private flashCardsResponse = DB.flashCardsResponse;

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

  public async getFlashCardResponse(userId: number): Promise<IFlashCardsResponse[] | null> {
    const where = { created_by: userId }
    const include = [
      {
        model: FlashCards,
        as: 'flashCard',
        attributes: [],
      }
    ];
    const options: {
      raw: boolean;
      where: any;
      order: any;
      limit?: number;
      offset?: number;
      include?: any;
      attributes?: any;
      logging?: any;
      nest?: boolean;
      subQuery: boolean;
    } = {
      attributes: [
        'id', 'response_type', 'flashCard.question', 'flashCard.answer'
      ],
      logging: console.log,
      order: [['id', 'ASC']],
      where: where,
      subQuery: false,
      include: include,
      nest: true,
      raw: true,
    };
    const getFlashCard: IFlashCardsResponse[] = await this.flashCardsResponse.findAll(options);
    return getFlashCard;
  }


  public async getFlashCardByBuildId(buildId: number): Promise<IFlashCards[] | null> {
    const where = { build_Id : buildId }    
    const include = [
      {
        model: User,
        as: 'created_by_user',
        attributes: [],
      }
    ];
    const options: {
      raw: boolean;
      where: any;
      order: any;
      limit?: number;
      offset?: number;
      include?: any;
      attributes?:any ;
      logging?: any;
      nest?: boolean;
      subQuery: boolean;
       group: any;

    } = {
      attributes: [
        'id', 'created_by_user.user_name', 'created_by_user.tag_line', 'created_by_user.email',
        'question', 'answer'
      ],
      logging: console.log,
      order: [['id', 'ASC']],
      where: where,
      subQuery: false,
      include: include,
      group: ['created_by','id'],
      nest: true,
      raw: true,
    };
    const getFlashCardBuildId: IFlashCards[] | any = await this.flashCard.findAll(options);
    return getFlashCardBuildId;
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

/* eslint-disable prettier/prettier */
import { HttpException } from "@/exceptions/HttpException";
import {
  IFlashCards,
  IFlashCardsResponse,
} from "@/interfaces/flashCards.interface";
import FlashCards from "@/models/flashCards.model";
import User from "@/models/user.model";
import DB from "@databases";
import { isEmpty } from "class-validator";
import { col, QueryTypes } from "sequelize";

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

  public async createFlashCardDeck(
    cardData:IFlashCards[]
  ): Promise<IFlashCards[]> {
   
    if (isEmpty(cardData)) {
      throw new HttpException(400, "Enter the card data");
    }   

    const createCardData: IFlashCards[] = await this.flashCard.bulkCreate(
      cardData,
    );
    return createCardData;
  }

  public async createFlashCardResponse(
    cardNewData: IFlashCardsResponse
  ): Promise<IFlashCardsResponse | null> {
    if (isEmpty(cardNewData)) {
      throw new HttpException(400, "Enter the card data");
    }
    const createFlashCardResponse: IFlashCardsResponse | null =
      await this.flashCardsResponse.create({ ...cardNewData }, { raw: true });
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

  public async getFlashCardResponse(
    userId: number
  ): Promise<IFlashCardsResponse[] | null> {
    const where = { created_by: userId };
    const include = [
      {
        model: FlashCards,
        as: "flashCard",
        attributes: [],
      },
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
        "id",
        "response_type",
        "flashCard.question",
        "flashCard.answer",
      ],
      order: [["id", "ASC"]],
      where: where,
      subQuery: false,
      include: include,
      nest: true,
      raw: true,
    };
    const getFlashCard: IFlashCardsResponse[] =
      await this.flashCardsResponse.findAll(options);
    return getFlashCard;
  }

  public async getFlashCardResponseByCard(
    userId: number,
    cardId: number
  ): Promise<IFlashCardsResponse[] | null> {
    const where = { created_by: userId, flash_card_id: cardId };
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
      attributes: ["id", "flash_card_id", "response_type", "created_by"],
      order: [["id", "ASC"]],
      where: where,
      subQuery: false,
      nest: true,
      raw: true,
    };
    const getFlashCard: IFlashCardsResponse[] =
      await this.flashCardsResponse.findAll(options);
    return getFlashCard;
  }

  public async getFlashCardByBuildId(
    buildId: number
  ): Promise<IFlashCards[] | any> {
    const query = ` SELECT fc.id,u.user_name, u.tag_line,u.email,fc.question,fc.answer,u.id AS user_id,fr.response_type
                    FROM flash_cards As fc
                    LEFT JOIN users AS u ON fc.created_by = u.id
                    LEFT JOIN  flash_cards_response AS fr ON fc.id = fr.flash_card_id
                    WHERE fc.build_id = ${buildId} AND u.is_blocked = 0
                    group by fc.id
                    ORDER BY CAST(fr.response_type AS CHAR) desc; `;
    const userQuery = `SELECT u.user_name,u.id AS user_id
                    FROM flash_cards As fc
                    LEFT JOIN users AS u ON fc.created_by = u.id
                    LEFT JOIN  flash_cards_response AS fr ON fc.id = fr.flash_card_id
                    WHERE fc.build_id = ${buildId} AND u.is_blocked = 0
                    group by u.id
                    ORDER BY CAST(fr.response_type AS CHAR) desc; `;
    const getFlashCardBuildId: IFlashCards[] = await DB.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    const getFlashCardUsers: IFlashCards[] = await DB.sequelize.query(
      userQuery,
      {
        type: QueryTypes.SELECT,
      }
    );
    return { build: getFlashCardBuildId, users: getFlashCardUsers };
  }

  public async getFlashCardByBuildId1(
    buildId: number
  ): Promise<IFlashCards[] | any> {
    const where = { build_Id: buildId };
    const include = [
      {
        model: User,
        as: "created_by_user",
        attributes: [],
      },
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
        "id",
        "created_by_user.user_name",
        "created_by_user.tag_line",
        "created_by_user.email",
        "question",
        "answer",
        [col("created_by_user.id"), "user_id"],
      ],
      order: [["id", "ASC"]],
      where: where,
      subQuery: false,
      include: include,
      nest: true,
      raw: true,
    };
    const userOption: {
      raw: boolean;
      where: any;
      limit?: number;
      offset?: number;
      include?: any;
      attributes?: any;
      nest?: boolean;
      subQuery: boolean;
      group: any;
    } = {
      attributes: [
        "created_by_user.user_name",
        [col("created_by_user.id"), "user_id"],
      ],
      where: where,
      group: "created_by_user.id",
      subQuery: false,
      include: include,
      nest: true,
      raw: true,
    };
    const getFlashCardBuildId: IFlashCards[] | any =
      await this.flashCard.findAll(options);
    const getFlashCardUsers: IFlashCards[] | any = await this.flashCard.findAll(
      userOption
    );
    return { build: getFlashCardBuildId, users: getFlashCardUsers };
  }

  public async getFlashCard(userId: number): Promise<IFlashCards[] | any> {
    const query = `SELECT fc.id,fc.question,fc.answer , fr.response_type
    FROM flash_cards As fc
    LEFT JOIN  flash_cards_response AS fr ON fc.id = fr.flash_card_id
    WHERE fc.created_by = ${userId} 
    group by fc.id
    ORDER BY CAST(fr.response_type AS CHAR) desc; `;
    const flashCards: IFlashCards[] = await DB.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return flashCards;
  }

  public async getFlashCard1(userId: number): Promise<IFlashCards[] | null> {
    const where = { "$flashCard.created_by$": userId };
    const include = [
      {
        model: FlashCards,
        as: "flashCard",
        attributes: [],
      },
    ];
    const options: {
      raw: boolean;
      where: any;
      order: any;
      include?: any;
      attributes?: any;
      logging?: any;
      subQuery: boolean;
    } = {
      attributes: [
        "flashCard.id",
        "flashCard.build_id",
        "flashCard.question",
        "flashCard.answer",
        "flashCard.created_by",
      ],
      order: [["id", "ASC"]],
      where: where,
      subQuery: false,
      include: include,
      raw: true,
    };
    const flashCards: IFlashCards[] | any =
      await this.flashCardsResponse.findAll(options);
    // const flashCards: IFlashCards[] | null = await this.flashCardsResponse.findAll({
    //   where: { created_by: userId },
    //   raw: true,
    // });
    if (!flashCards) {
      return null;
    } else {
      return flashCards;
    }
  }

  public async getFlashCardBuildId(
    buildId: number
  ): Promise<IFlashCards[] | null> {
    const flashCardsBuildId: IFlashCards[] | null =
      await this.flashCard.findAll({
        where: { build_id: buildId },
        raw: true,
      });
    if (!flashCardsBuildId) {
      return null;
    } else {
      return flashCardsBuildId;
    }
  }

  public async getTotalFlashCard(userId: any): Promise<IFlashCards[] | any> {
    const query = `SELECT COUNT(*) AS flashCard FROM flash_cards AS fc
    LEFT JOIN boxes box on fc.id = box.id
    where fc.created_by = ${userId} `;
    const Count: IFlashCards[] = await DB.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return Count;
  }

  public async updateFlashCardId(
    id: number,
    data: any
  ): Promise<IFlashCards | null> {
    const flashCardByUpdate: any | null = await this.flashCard.update(
      { ...data },
      { where: { id: id } }
    );

    if (!flashCardByUpdate) {
      return null;
    } else {
      return flashCardByUpdate;
    }
  }

  public async updateFlashCardResponse(
    id: number | undefined,
    data: any
  ): Promise<IFlashCards | null> {
    const flashCardRespUpdate: any | null =
      await this.flashCardsResponse.update({ ...data }, { where: { id: id } });

    if (!flashCardRespUpdate) {
      return null;
    } else {
      return flashCardRespUpdate;
    }
  }

  public async getDuplicateFlashCard(question:any,buildId:any,userId:any): Promise<IFlashCards[] | any > {
    const query = `SELECT fc.question, fc.build_id, fc.created_by
    FROM flash_cards As fc
    WHERE fc.question like "%${question}%" and
    fc.created_by = ${userId} and fc.build_id = ${buildId}`
    const duplicate : IFlashCards[] = await DB.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return duplicate;
  }

  public async getFlashCardDeck(buildId:number):Promise<IFlashCards[] | any>{
    const query = `SELECT * FROM webuild.flash_cards 
    where build_id = ${buildId} and previous_user != created_by;`
    const flashCardDeck : IFlashCards[] = await DB.sequelize.query(query,{
      type:  QueryTypes.SELECT,
    })
    return flashCardDeck;
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

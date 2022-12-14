/* eslint-disable prettier/prettier */
import { HttpException } from "@/exceptions/HttpException";
import { IBoxReviews } from "@/interfaces/boxreviews.interface";
import Boxes from "@/models/boxes.model";
import BoxReviewsResponse from "@/models/boxReviewResponse.model";
import BoxReviews from "@/models/boxReviews.model";
import DB from "@databases";
import { isEmpty } from "class-validator";
import { QueryTypes } from "sequelize";

class BoxService {
  getTotalAwerness(user: any) {
    throw new Error("Method not implemented.");
  }
  private reviews = DB.boxReviews;

  public async createBoxReview(
    reviewData: IBoxReviews | any
  ): Promise<IBoxReviews | null> {
    if (isEmpty(reviewData)) {
      throw new HttpException(400, "Enter the build data");
    }
    const createBuildData: IBoxReviews = await this.reviews.create(reviewData);
    return createBuildData;
  }

  public async getReviews(userId: number): Promise<IBoxReviews[] | null> {
    const reviews: IBoxReviews[] | null = await this.reviews.findAll({
      where: { created_by: userId },
      raw: true,
    });
    if (!reviews) {
      return null;
    } else {
      return reviews;
    }
  }

  public async getReviewsByBox(id: number): Promise<IBoxReviews[] | null> {
    if (isEmpty(id)) {
      throw new HttpException(400, "Enter ID");
    }
    const query = `SELECT br.id,br.box_id, br.review_type, br.comment,brr.comment AS challenge,brr.review_type AS response_review 
                    FROM
                  boxes box
                  INNER JOIN box_reviews br ON box.id = br.box_id
                  LEFT JOIN box_reviews_response brr ON br.id = brr.boxReview_id
                  where box.build_id =  ${id} `;
    const reviewsByBox: IBoxReviews[] | any = await DB.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    if (!reviewsByBox) {
      return null;
    } else {
      return reviewsByBox;
    }
  }

  public async getTotalAwarenessById(
    userId: any
  ): Promise<IBoxReviews[] | any> {
    const query = `SELECT COUNT(*) AS awareness FROM box_reviews AS br
    LEFT JOIN boxes box on br.id = box.id
    where br.created_by = ${userId} `;
    const AwarenessById: IBoxReviews[] = await DB.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return AwarenessById;
  }
}
export default BoxService;

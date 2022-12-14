/* eslint-disable prettier/prettier */
import { HttpException } from "@/exceptions/HttpException";
import { IBoxReviewsResponse } from "@/interfaces/boxReviewResponse";
import BoxReviewsResponse from "@/models/boxReviewResponse.model";
import BoxReviews from "@/models/boxReviews.model";
import DB from "@databases";
import { isEmpty } from "class-validator";
import { QueryTypes } from "sequelize";

class BoxResponseService {
  getTotalAwerness(user: any) {
    throw new Error("Method not implemented.");
  }
  private reviews = DB.boxReviewsResponse;

  public async createBoxReviewResponse(
    reviewData: IBoxReviewsResponse | any
  ): Promise<IBoxReviewsResponse | null> {
    if (isEmpty(reviewData)) {
      throw new HttpException(400, "Enter the boxReviewResponse data");
    }
    const createBuildData: IBoxReviewsResponse = await this.reviews.create(reviewData);
    return createBuildData;
  }

  public async getReviewsResponse(userId: number): Promise<IBoxReviewsResponse[] | null> {
    const reviews: IBoxReviewsResponse[] | null = await this.reviews.findAll({
      where: { created_by: userId },
      raw: true,
    });
    if (!reviews) {
      return null;
    } else {
      return reviews;
    }
  }


  public async getReviewsResponseByAwareness(id: number): Promise<IBoxReviewsResponse[] | null> {
    if (isEmpty(id)) {
      throw new HttpException(400, "Enter ID");
    }
    const where = { "$box_reviews.box_id$": id };
    const include = [
      {
        model: BoxReviews,
        attributes: [],
        as: "box_reviews",
      },
    ];
    const options: {
      raw: boolean;
      where: any;
      include?: any;
      attributes?: any;
      logging?: any;
      nest?: boolean;
      subQuery: boolean;
    } = {
      attributes: ["boxReview_id", "review_type", "comment"],
      logging: console.log,
      where: where,
      subQuery: false,
      include: include,
      nest: true,
      raw: true,
    };
    const reviewsByAwareness: IBoxReviewsResponse[] | any = await this.reviews.findAll(options);
    if (!reviewsByAwareness) {
      return null;
    } else {
      return reviewsByAwareness;
    }
  }


//   public async getTotalAwarenessById(
//     userId: any
//   ): Promise<IBoxReviewsResponse[] | any> {
//     const query = `SELECT COUNT(*) AS boxreviews_total FROM box_reviews AS br
//     LEFT JOIN boxes box on br.id = box.id
//     where br.created_by = ${userId} `;
//     const BuildById: IBoxReviewsResponse[] = await DB.sequelize.query(query, {
//       type: QueryTypes.SELECT,
//     });
//     return BuildById;
//   }
}
export default BoxResponseService;

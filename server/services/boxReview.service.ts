import { HttpException } from "@/exceptions/HttpException";
import { IBoxReviews } from "@/interfaces/boxreviews.interface";
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

  public async getReviewsByBox(boxId: number,type:string): Promise<IBoxReviews[] | null> {
    const reviewsById: IBoxReviews[] | null = await this.reviews.findAll({
      where: { box_id: boxId , review_type:type },
      raw: true,
    });
    if (!reviewsById) {
      return null;
    } else {
      return reviewsById;
    }
  }

  public async getTotalAwernessById(userId:any): Promise<IBoxReviews[] | any> { 
    const query = `SELECT COUNT(*) AS boxreviews_total FROM box_reviews AS br
    LEFT JOIN boxes box on br.id = box.id
    where br.created_by = ${userId} `;
    const BuildById: IBoxReviews[] = await DB.sequelize.query(query, { type: QueryTypes.SELECT });
    return BuildById;
  }
}
export default BoxService;

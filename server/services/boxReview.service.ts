/* eslint-disable prettier/prettier */
import { HttpException } from "@/exceptions/HttpException";
import { IBoxReviews } from "@/interfaces/boxreviews.interface";
import DB from "@databases";
import { isEmpty } from "class-validator";

class BoxService {
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

  public async getReviewsByBox(boxId: number,reviewType:string): Promise<IBoxReviews[] | null> {
    const reviewsById: IBoxReviews[] | null = await this.reviews.findAll({
      where: { box_id: boxId , review_type:reviewType },
      raw: true,
    });
    if (!reviewsById) {
      return null;
    } else {
      return reviewsById;
    }
  }
}

export default BoxService;

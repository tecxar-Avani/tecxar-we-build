import { HttpException } from "@/exceptions/HttpException";
import { IBoxReviews } from "@/interfaces/boxreviews.interface";
import Boxes from "@/models/boxes.model";
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
    const where = { "$box.build_id$": id };
    const include = [
      {
        model: Boxes,
        attributes: [],
        as: "box",
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
      attributes: ["id", "review_type", "comment"],
      logging: console.log,
      where: where,
      subQuery: false,
      include: include,
      nest: true,
      raw: true,
    };
    const reviewsByBox: IBoxReviews[] | any = await this.reviews.findAll(options);
    if (!reviewsByBox) {
      return null;
    } else {
      return reviewsByBox;
    }
  }


  public async getTotalAwarenessById(
    userId: any
  ): Promise<IBoxReviews[] | any> {
    const query = `SELECT COUNT(*) AS boxreviews_total FROM box_reviews AS br
    LEFT JOIN boxes box on br.id = box.id
    where br.created_by = ${userId} `;
    const BuildById: IBoxReviews[] = await DB.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return BuildById;
  }
}
export default BoxService;

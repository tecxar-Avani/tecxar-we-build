import { Response } from "express";
import {
    Controller,
    Req,
    UseBefore,
    Res,
    Get,
    Body,
    HttpCode,
    Post,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import BoxReviewService from "@/services/boxReview.service";
import authMiddleware from "@/middlewares/auth.middleware";
import { IBoxReviews } from "@/interfaces/box_reviews.interface";
import { BoxReviewDto } from "@/dtos/boxreviews.dto";

@Controller("/reviews")
@UseBefore(authMiddleware)
export class FlashController {
  private reviewService = new BoxReviewService();

  @Post("/create")
  @HttpCode(201)
  @OpenAPI({ summary: "Create a new flash card" })
  async createReview(
    @Body() reviewData: BoxReviewDto,
    @Req() req: Request | any,
    @Res() res: Response
  ) {
    try {
      reviewData.created_by = req.user.id;
      const createReviewData: IBoxReviews | null =
        await this.reviewService.createBoxReview(reviewData);
      return {
        status: true,
        data: createReviewData,
        message: "Review created successfully.",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { error: { code: 500, message: error.message } };
      }
    }
  }

  @Get("/")
  @OpenAPI({ summary: "Get all reviews of users" })
  async getFlashCard(@Req() req: Request | any, @Res() res: Response) {
    try {
      const user = req.user.id;
      const reviewData = await this.reviewService.getReviews(user);
      return reviewData;
    } catch (error) {
      return {
        error: {
          code: 500,
          message: (error as Error).message,
        },
      };
    }
  }
}

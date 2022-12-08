/* eslint-disable prettier/prettier */
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
  Param,
  QueryParams,
  QueryParam,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import BoxReviewService from "@/services/boxReview.service";
import authMiddleware from "@/middlewares/auth.middleware";
import { IBoxReviews } from "@/interfaces/boxreviews.interface";
import { BoxreviewDto } from "@/dtos/boxreviews.dto";

@Controller("/reviews")
@UseBefore(authMiddleware)
export class FlashController {
  private reviewService = new BoxReviewService();

  @Post("/create")
  @HttpCode(201)
  @OpenAPI({ summary: "Create a new BoxReviews" })
  async createReview(
    @Body() reviewData: BoxreviewDto,
    @Req() req: Request | any,
    @Res() res: Response
  ) {
    try {
      reviewData.created_by = 5;
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
  async getBoxReviews(@Req() req: Request | any, @Res() res: Response) {
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

  @Get("/getReviewsByBoxId")
  @OpenAPI({ summary: "Get all reviews of users" })
  async getReviewsByBoxId(@Req() req: Request | any, @QueryParam('boxId')  boxId: number, @QueryParam('type') type:string ,@Res() res: Response) {
    try {
      const reviewDataByBox = await this.reviewService.getReviewsByBox(boxId,type);
      return reviewDataByBox;
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

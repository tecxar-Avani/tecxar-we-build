/* eslint-disable prettier/prettier */
import { Response } from "express";
import {
  Controller,
  Req,
  UseBefore,
  Get,
  Body,
  HttpCode,
  Post,
  QueryParam,
  Param,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import BoxReviewService from "@/services/boxReview.service";
import authMiddleware from "@/middlewares/auth.middleware";
import { IBoxReviews } from "@/interfaces/boxreviews.interface";
import { BoxreviewDto } from "@/dtos/boxreviews.dto";
import { RequestWithUser } from "@/interfaces/auth.interface";

@Controller("/reviews")
// @UseBefore(authMiddleware)
export class FlashController {
  private reviewService = new BoxReviewService();

  @Post("/create")
  @UseBefore(authMiddleware)
  @HttpCode(201)
  @OpenAPI({ summary: "Create a new BoxReviews" })
  async createReview(@Body() reviewData: any, @Req() req: RequestWithUser,res:Response) {
    try {
      reviewData.created_by = req.user.id;
      const createReviewData: IBoxReviews | null =
        await this.reviewService.createBoxReview(reviewData);
        if(req?.cookies?.awarenessData) {
        res?.cookie("awarenessData", "",  {expires: new Date(0)});
      }
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
  async getBoxReviews(@Req() req: RequestWithUser) {
    try {
      const { id } = req.user;
      const reviewData = await this.reviewService.getReviews(id);
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

  @Get("/getReviewsByBoxId/:buildId")
  @OpenAPI({ summary: "get review by box id" })
  async getReviewsByBoxId(@Param("buildId") id: number) {
    try {
      const reviewDataByBox = await this.reviewService.getReviewsByBox(id);
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

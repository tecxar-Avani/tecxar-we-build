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
@UseBefore(authMiddleware)
export class FlashController {
  private reviewService = new BoxReviewService();

  @Post("/create")
  @HttpCode(201)
  @OpenAPI({ summary: "Create a new BoxReviews" })
  async createReview(@Body() reviewData: BoxreviewDto) {
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

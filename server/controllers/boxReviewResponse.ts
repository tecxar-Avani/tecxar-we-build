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
import authMiddleware from "@/middlewares/auth.middleware";
import { RequestWithUser } from "@/interfaces/auth.interface";
import BoxResponseService from "@/services/boxReviewResponse";
import { IBoxReviewsResponse } from "@/interfaces/boxReviewResponse";
import { BoxReviewResponseDto } from "@/dtos/boxReviewResponse.dto";

@Controller("/reviewResponse")
// @UseBefore(authMiddleware)
export class BoxReviewResponseController {
  private reviewResponseService = new BoxResponseService();

  @Post("/create")
  @HttpCode(201)
  @OpenAPI({ summary: "Create a new BoxReviewsResponse" })
  async createReviewResponse(@Body() reviewData: BoxReviewResponseDto) {
    try {
      reviewData.created_by = 5;
      const createReviewResponseData: IBoxReviewsResponse | null =
        await this.reviewResponseService.createBoxReviewResponse(reviewData);
      return {
        status: true,
        data: createReviewResponseData,
        message: "Review response created successfully.",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { error: { code: 500, message: error.message } };
      }
    }
  }

  @Get("/")
  @OpenAPI({ summary: "Get all reviews response of users" })
  async getReviewsResponse(@Req() req: RequestWithUser) {
    try {
      const { id } = req.user;
      const reviewResponseData = await this.reviewResponseService.getReviewsResponse(id);
      return reviewResponseData;
    } catch (error) {
      return {
        error: {
          code: 500,
          message: (error as Error).message,
        },
      };
    }
  }

  @Get("/getReviewsByBoxId/:box_review_id")
  @OpenAPI({ summary: "get review by awareness id" })
  async getReviewsResponseByAwareness(@Param("box_review_id") id: number) {
    try {
      const reviewResponseDataByAwareness = await this.reviewResponseService.getReviewsResponseByAwareness(id);

      return reviewResponseDataByAwareness;
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

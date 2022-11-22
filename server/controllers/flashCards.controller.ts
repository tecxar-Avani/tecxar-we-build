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
  Delete,
  Put,
  Param,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import FlashCardService from "@/services/flashCards.service";
import authMiddleware from "@/middlewares/auth.middleware";
import {
  flashcardsDto,
  updateflashcardsDto,
  flashCardResponseDto,
} from "@/dtos/flashcards.dto";
import {
  IFlashCards,
  IFlashCardsResponse,
} from "@/interfaces/flashCards.interface";

@Controller("/flashcard")
//@UseBefore(authMiddleware)
export class FlashController {
  private flashCardService = new FlashCardService();

  @Post("/create")
  @HttpCode(201)
  @OpenAPI({ summary: "Create a new flash card" })
  async createFlashCard(
    @Body() cardData: flashcardsDto,
    @Req() req: Request | any,
    @Res() res: Response
  ) {
    try {
      //should make build id and created by id dynamic
      cardData.build_id = 2;
      cardData.created_by = 5;
      const createCardData: IFlashCards | null =
        await this.flashCardService.createFlashCard(cardData);
      return {
        status: true,
        data: createCardData,
        message: "Flash Card created successfully.",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { error: { code: 500, message: error.message } };
      }
    }
  }

  @Post("/createflashcard")
  @HttpCode(201)
  @OpenAPI({ summary: "Create a new flash card" })
  async createFlashCardResponse(
    @Body() cardData: flashCardResponseDto,
    @Req() req: Request | any,
    @Res() res: Response
  ) {
    try {
      cardData.created_by = req.user.id;
      const createCardData: IFlashCardsResponse | null =
        await this.flashCardService.createFlashCardResponse(cardData);
      return {
        status: true,
        data: createCardData,
        message: "Flash Card created successfully.",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { error: { code: 500, message: error.message } };
      }
    }
  }

  @Get("/")
  @OpenAPI({ summary: "Get all build of users" })
  async getFlashCard(@Req() req: Request | any, @Res() res: Response) {
    try {
      const user = 4;
      const flashBuild = await this.flashCardService.getFlashCard(user);
      return flashBuild;
    } catch (error) {
      return {
        error: {
          code: 500,
          message: (error as Error).message,
        },
      };
    }
  }

  @Get("/:id")
  @OpenAPI({ summary: "Get all build of users" })
  async getFlashCardBuildId(
    @Req() req: Request | any,
    @Param("id") buildId: number,
    @Res() res: Response
  ) {
    try {
      const flashBuildId = await this.flashCardService.getFlashCardBuildId(
        buildId
      );
      if (flashBuildId === null) {
        return res.send({
          status: 404,
          message: "Leave type with this Id not found",
        });
      }
      return { status: true, data: flashBuildId };
    } catch (error) {
      if (error instanceof Error) {
        return { status: false, error: { code: 500, message: error.message } };
      }
    }
  }

  @Put("/:id")
  @OpenAPI({ summary: "Update build id of users" })
  async updateFlashCard(
    @Req() req: Request | any,
    @Param("id") id: number,
    @Body() data: updateflashcardsDto,
    @Res() res: Response
  ) {
    try {
      const userBuild = await this.flashCardService.updateFlashCardId(id, data);
      return userBuild;
    } catch (error) {
      return {
        error: {
          code: 500,
          message: (error as Error).message,
        },
      };
    }
  }

  @Delete("/:id")
  @OpenAPI({ summary: "delete all build of users" })
  async deleteFlashCardById(
    @Req() req: Request | any,
    @Param("id") id: number,
    @Res() res: Response
  ) {
    try {
      const flashByDeleteId = await this.flashCardService.deleteFlashCardById(
        id
      );
      if (flashByDeleteId === null) {
        return res.send({
          status: 404,
          message: "Flash Card with this Id not found",
        });
      }
      return { status: true, data: flashByDeleteId };
    } catch (error) {
      if (error instanceof Error) {
        return { status: false, error: { code: 500, message: error.message } };
      }
    }
  }
}

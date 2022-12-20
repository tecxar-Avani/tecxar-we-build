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
import { flashcardsDto, updateflashcardsDto, flashCardResponseDto } from "@/dtos/flashcards.dto";
import { IFlashCards, IFlashCardsResponse } from "@/interfaces/flashCards.interface";
import { RequestWithUser } from "@/interfaces/auth.interface";

@Controller("/flashcard")
@UseBefore(authMiddleware)
export class FlashController {
  private flashCardService = new FlashCardService();

  @Post("/create")
  @HttpCode(201)
  @OpenAPI({ summary: "Create a new flash card" })
  async createFlashCard(
    @Body() cardData: flashcardsDto, @Req() req: RequestWithUser,
  ) {
    try {
      //should make build id and created by id dynamic
      cardData.created_by = req.user.id;
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

  @Post("/flashcardresponse")
  @HttpCode(201)
  // @UseBefore(authMiddleware)
  @OpenAPI({ summary: "Create a new FlashCard Response" })
  async flashcardResponse(
    @Body() flashcardResponseData: flashCardResponseDto,
    @Req() req: RequestWithUser,
  ) {
    try {
      flashcardResponseData.created_by = req.user.id;
      const createFlashCardResponseData: IFlashCardsResponse | null =
        await this.flashCardService.createFlashCardResponse(
          flashcardResponseData
        );
      return {
        status: true,
        data: createFlashCardResponseData,
        message: "FlashCard response added successfully.",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { error: { code: 500, message: error.message } };
      }
    }
  }

  @Get("/")
  @OpenAPI({ summary: "Get all flashCard of users" })
  async getFlashCard(@Req() req: RequestWithUser) {
    try {
      const {id} = req.user;
      const flashBuild = await this.flashCardService.getFlashCard(id);
      return {
        status: true,
        data: flashBuild,
      };
    } catch (error) {
      return {
        error: {
          code: 500,
          message: (error as Error).message,
        },
      };
    }
  }

  @Get("/flashcardresponse")
  @OpenAPI({ summary: "Get flashcard response" })
  async getFlashCardResponse(@Req() req: RequestWithUser, @Res() res: Response) {
    try {
      const {id} = req.user;
      const flashBuild = await this.flashCardService.getFlashCardResponse(id);
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

  @Get("/flashcardByBuild/:id")
  @OpenAPI({ summary: "Get all flash card by build" })
  async getFlashCardByBuildId(
    @Param("id") id: number,
  ) {
    try {
      const flashBuild = await this.flashCardService.getFlashCardByBuildId(id);
      return { status: true,flashBuild};
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
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: "Update build id of users" })
  async updateFlashCard(
    @Param("id") id: number,
    @Body() data: updateflashcardsDto,
  ) {
    try {

      const userBuild = await this.flashCardService.updateFlashCardId(id, data);
      return{ userBuild ,message: "FlashCard updated successfully"}
    } catch (error) {
      return {
        error: {
          code: 500,
          message: (error as Error).message,
        },
      };
    }
  }

  @Delete("/deleteFlashCard/:id")
   @UseBefore(authMiddleware)
  @OpenAPI({ summary: "delete all build of users" })
  async deleteFlashCardById(
    @Param("id") id: number,
    @Res() res: Response
  ) {
    try {
      const flashByDeleteId = await this.flashCardService.deleteFlashCardById(id);
      if (flashByDeleteId === null) {
        return res.send({
          status: 404,
          message: "FlashCard with this Id not found",
        });
      }
      return { status: true, data: flashByDeleteId , message: "FlashCard delete successfully",};
    } catch (error) {
      if (error instanceof Error) {
        return { status: false, error: { code: 500, message: error.message } };
      }
    }
  }
}

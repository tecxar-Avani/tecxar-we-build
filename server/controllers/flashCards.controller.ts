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
  @UseBefore(authMiddleware)
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

  @Post("/flashcardresponse")
  @HttpCode(201)
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: "Create a new FlashCard Response" })
  async flashcardResponse(
    @Body() flashcardResponseData: flashCardResponseDto,
    @Req() req: Request | any,
    @Res() res: Response
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
        message: "FlashCard Response created successfully.",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { error: { code: 500, message: error.message } };
      }
    }
  }

  @Get("/")
  @OpenAPI({ summary: "Get all flashCard of users" })
  async getFlashCard(@Req() req: RequestWithUser | any, @Res() res: Response) {
    try {
      const user = req.user.id;
      const flashBuild = await this.flashCardService.getFlashCard(user);
      return {
        status: true,
        data: flashBuild,
      };
    } catch (error) {
      console.log(error);
      
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
  async getFlashCardResponse(@Req() req: Request | any, @Res() res: Response) {
    try {
      const userId = req.user.id;
      const flashBuild = await this.flashCardService.getFlashCardResponse(userId);
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
    @Req() req: Request | any,
    @Param("id") id: number,
    @Res() res: Response
  ) {
    try {
      const flashBuild = await this.flashCardService.getFlashCardByBuildId(id);
      return {
        status: true,
        flashBuild,
      };

      // let output = []
      // flashBuild.forEach(function(item) {
      //   var existing = output.filter(function(v, i) {
      //      v.user_id == item.user_id;
      //   });
      //   if (existing.length) {
      //     let existingIndex = output.indexOf(existing[0]);
      //    console.log('>>>>>>>',Object.assign({userId: item.user_id}));
      //     output[existingIndex].value = output[existingIndex].value.concat(item.user_id);
      //   } else {
      //     if (typeof item.user_id == 'number')
      //       item.user_id = [item.user_id];
      //     output.push(item);
      //   }
      // });
      // console.log('/////////',output);
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
  @UseBefore(authMiddleware)
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

  @Delete("deleteFlashCard/:id")
   @UseBefore(authMiddleware)
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
          message: "FlashCard with this Id not found",
        });
      }
      return { status: true, data: flashByDeleteId };
    } catch (error) {
      console.log("--ERROR--", error);

      if (error instanceof Error) {
        return { status: false, error: { code: 500, message: error.message } };
      }
    }
  }
}

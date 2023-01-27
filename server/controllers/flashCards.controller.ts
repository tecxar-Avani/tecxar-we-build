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
import { RequestWithUser } from "@/interfaces/auth.interface";

@Controller("/flashcard")
export class FlashController {
  private flashCardService = new FlashCardService();

  @Post("/create")
  @UseBefore(authMiddleware)
  @HttpCode(201)
  @OpenAPI({ summary: "Create a new flash card" })
  async createFlashCard(
    @Body() cardData: flashcardsDto,
    @Req() req: RequestWithUser
  ) {
    try {
      //should make build id and created by id dynamic
      cardData.created_by = req.user.id;
      
       const duplicateFlashCard : IFlashCards | any = await this.flashCardService.getDuplicateFlashCard(cardData.question,cardData.build_id,cardData.created_by)
       if(duplicateFlashCard.length > 0){
        return { status: true,
          data: [],
          message: "You can't add this flashcard", 
        };
       }
       else{
        const createCardData: IFlashCards | null =
          await this.flashCardService.createFlashCard(cardData);
          return {
            status: true,
            data: createCardData,
            message: "Flash Card created successfully.",
          };  
       }
       
    
    } catch (error) {
      if (error instanceof Error) {
        return { error: { code: 500, message: error.message } };
      }
    }
  }

  @Post("/deck")
  // @UseBefore(authMiddleware)
  @HttpCode(201)
@OpenAPI({summary: "Add Flashcards To you deck"})
async addFlashCardDeck(
  @Body() cardData: IFlashCards[] | any,
    @Req() req: RequestWithUser
){
  try {
    //should make build id and created by id dynamic
    // cardData.created_by = req.user.id;
 
      const createCardData: IFlashCards[] | null =
        await this.flashCardService.createFlashCardDeck(cardData);
        return {
          status: true,
          data: createCardData,
          message: "Flash Cards added to your deck successfully.",
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
    @Req() req: RequestWithUser
  ) {
    try {
      flashcardResponseData.created_by = req.user.id;
      const existingRes =
        await this.flashCardService.getFlashCardResponseByCard(
          req.user.id,
          flashcardResponseData.flash_card_id
        );
      if (existingRes && existingRes.length > 0) {
        await this.flashCardService.updateFlashCardResponse(existingRes[0].id, {
          response_type: flashcardResponseData.response_type,
        });
      } else {
        await this.flashCardService.createFlashCardResponse(
          flashcardResponseData
        );
      }

      return {
        status: true,
        data: [],
        message: "FlashCard response added successfully.",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { error: { code: 500, message: error.message } };
      }
    }
  }

  @Get("/")
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: "Get all flashCard of users" })
  async getFlashCard(@Req() req: RequestWithUser) {
    try {
      const { id } = req.user;
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
  async getFlashCardResponse(
    @Req() req: RequestWithUser,
    @Res() res: Response
  ) {
    try {
      const { id } = req.user;
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
  async getFlashCardByBuildId(@Param("id") id: number) {
    try {
      const flashBuild = await this.flashCardService.getFlashCardByBuildId(id);
      return { status: true, flashBuild };
    } catch (error) {
      return {
        error: {
          code: 500,
          message: (error as Error).message,
        },
      };
    }
  }

 @Get("/flashCardDeck/:id")
 @OpenAPI({summary:"get flashcard deck"})
 async getFlashCardDeck(@Param("id") id:number){
  try{
    const flashDeck = await this.flashCardService.getFlashCardDeck(id);
    return { status: true, flashDeck };
  }catch(error){
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
    @Body() data: updateflashcardsDto
  ) {
    try {
      const userBuild = await this.flashCardService.updateFlashCardId(id, data);
      return { userBuild, message: "FlashCard updated successfully" };
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
  async deleteFlashCardById(@Param("id") id: number, @Res() res: Response) {
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
      return {
        status: true,
        data: flashByDeleteId,
        message: "FlashCard delete successfully",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { status: false, error: { code: 500, message: error.message } };
      }
    }
  }
}

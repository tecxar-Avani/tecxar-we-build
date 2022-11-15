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
import FlashCardService from "@/services/flashCards.service";
import authMiddleware from "@/middlewares/auth.middleware";
import { flashcardsDto } from "@/dtos/flashcards.dto";
import { IFlashCards } from "@/interfaces/flashCards.interface";

@Controller("/flashcard")
@UseBefore(authMiddleware)
export class FlashController {
  private flashCardService = new FlashCardService();

  @Post("/create")
  @HttpCode(201)
  @OpenAPI({ summary: "Create a new build" })
  async createFlashCard(
    @Body() cardData: flashcardsDto,
    @Req() req: Request | any,
    @Res() res: Response
  ) {
    try {
      cardData.created_by = req.user.id;
      cardData.updated_by = req.user.id;
      const createBuildData: IFlashCards | null =
        await this.flashCardService.createBuild(videoBuildData);
      if (createBuildData && createBuildData.id && videoBuildData.boxes) {
        const newArr = videoBuildData.boxes.map((box) => ({
          ...box,
          build_id: createBuildData.id,
        }));
        await this.boxService.createBox(newArr);
      }
      return {
        status: true,
        data: createBuildData,
        message: "Video Build created successfully.",
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
      const user = req.user.id;
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
}

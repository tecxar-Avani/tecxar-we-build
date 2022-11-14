import { Response } from "express";
import {
    Controller,
    Req,
    UseBefore,
    Res,
    Get,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import FlashCardService from "@/services/flashCards.service";
import authMiddleware from "@/middlewares/auth.middleware";

@Controller("/flashcard")
@UseBefore(authMiddleware)
export class FlashController {
    private FlashCardService = new FlashCardService();

    @Get("/")
    @OpenAPI({ summary: "Get all build of users" })
    async getFlashCard(@Req() req: Request| any, @Res() res: Response) {
        try {
            console.log('++++',req.user)
            const user = req.user.id;
            const flashBuild = await this.FlashCardService.getFlashCard(user);
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

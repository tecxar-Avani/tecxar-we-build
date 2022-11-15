import { Response } from "express";
import { Controller, Req, UseBefore, Res, Get, Param } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import FlashCardBuildIdService from "@/services/flashCardByBuildId.service";
import authMiddleware from "@/middlewares/auth.middleware";

@Controller("/flashcard")
@UseBefore(authMiddleware)
export class FlashCardByBuildId {
    private FlashCardBuildId = new FlashCardBuildIdService();
    @Get("/:id")
    @OpenAPI({ summary: "Get all build of users" })
    async getFlashCardBuildId(@Req() req: Request | any, @Param('id') buildId: number, @Res() res: Response) {
        try {
            const flashBuildId = await this.FlashCardBuildId.getFlashCardBuildId(buildId);
            if (flashBuildId === null) {
                return res.send({
                    status: 404,
                    message: 'Leave type with this Id not found',
                });
            }
            return { status: true, data: flashBuildId };
        }
        catch (error) {
            if (error instanceof Error) {
                return { status: false, error: { code: 500, message: error.message } };
            }
        }
    }
}

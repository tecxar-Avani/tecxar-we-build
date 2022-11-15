import { Response } from "express";
import { Controller, Req, UseBefore, Res, Param, Delete } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import FlashCardByDeleteId from "@/services/flashCardByDeleteId.service";
import authMiddleware from "@/middlewares/auth.middleware";

@Controller("/flashcard")
@UseBefore(authMiddleware)
export class FlashCardByBuildId {
    private FlashCardByDeleteId = new FlashCardByDeleteId();
    @Delete("/:id")
    @OpenAPI({ summary: "Get all build of users" })
    async delFlashCardByDeleteId(@Req() req: Request | any, @Param('id') id: number, @Res() res: Response) {
        try {
            const flashByDeleteId = await this.FlashCardByDeleteId.delFlashCardByDeleteId(id);
            if (flashByDeleteId === null) {
                return res.send({
                    status: 404,
                    message: 'Flash Card with this Id not found',
                });
            }
            return { status: true, data: flashByDeleteId };
        }
        catch (error) {
            if (error instanceof Error) {
                return { status: false, error: { code: 500, message: error.message } };
            }
        }
    }
}

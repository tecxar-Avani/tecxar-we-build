import { Response } from "express";
import {
    Controller,
    Req,
    UseBefore,
    Res,
    Get,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import BuildService from "@/services/build.service";
import authMiddleware from "@/middlewares/auth.middleware";

@Controller("/build")
@UseBefore(authMiddleware)
export class BuildController {
    private BuildService = new BuildService();

    @Get("/")
    @OpenAPI({ summary: "Get all build of users" })
    async getUsersBuild(@Req() req: Request| any, @Res() res: Response) {
        try {
            const user = req.user.id;
            const userBuild = await this.BuildService.getBuild(user);
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
}

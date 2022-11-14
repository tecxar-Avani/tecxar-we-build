import { Response } from "express";
import {
  Controller,
  Req,
  UseBefore,
  Res,
  Get,
  Post,
  HttpCode,
  Body,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import BuildService from "@/services/build.service";
import authMiddleware from "@/middlewares/auth.middleware";
import { RequestWithUser } from "@/interfaces/auth.interface";
import { videoBuildDto } from "@/dtos/videobuilds.dto";
import { IVideoBuild } from "@/interfaces/videoBuilds.interface";
import { now } from "sequelize/types/utils";

@Controller("/build")
@UseBefore(authMiddleware)
export class BuildController {
  private buildService = new BuildService();

  @Post("/create")
  //   @HttpCode(201)
  @OpenAPI({ summary: "Create a new build" })
  async createBuild(
    @Body() videoBuildData: any,
    @Req() req: Request | any,
    @Res() res: Response
  ) {
    try {
      console.log("DDDDDDDDDDDDDDDDD",req);
      videoBuildData.created_by = req.user.id;
      videoBuildData.createdAt = Date.now();
      videoBuildData.updatedAt = Date.now()
      const createBuildData: IVideoBuild | null =
        await this.buildService.createBuild(videoBuildData);

      return {
        status: true,
        data: createBuildData,
        message: "Video Build created successfully.",
      };
    } catch (error) {
      console.log("#################", error);
      if (error instanceof Error) {
        return { error: { code: 500, message: error.message } };
      }
    }
  }


  @Get("/")
  @OpenAPI({ summary: "Get all build of users" })
  async getUsersBuild(@Req() req: Request | any, @Res() res: Response) {
    try {
      const user = req.user.id;
      const userBuild = await this.buildService.getBuild(user);
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

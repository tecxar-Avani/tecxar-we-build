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
// import BoxService from '@/services/'
import authMiddleware from "@/middlewares/auth.middleware";
import { RequestWithUser } from "@/interfaces/auth.interface";
import { videoBuildDto } from "@/dtos/videobuilds.dto";
import { IVideoBuild } from "@/interfaces/videoBuilds.interface";
import { now } from "sequelize/types/utils";

@Controller("/build")
@UseBefore(authMiddleware)
export class BuildController {
  private buildService = new BuildService();
  // private boxService = new BoxService();

  @Post("/create")
  @HttpCode(201)
  @OpenAPI({ summary: "Create a new build" })
  async createBuild(
    @Body() videoBuildData: videoBuildDto,
    @Req() req: Request | any,
    @Res() res: Response
  ) {
    try {
      videoBuildData.created_by = req.user.id;
      videoBuildData.updated_by = req.user.id;
      const createBuildData: IVideoBuild | null =
        await this.buildService.createBuild(videoBuildData);
      if (createBuildData && createBuildData.id && videoBuildData.boxes) {
        const newArr = videoBuildData.boxes.map((box) => ({
          ...box,
          build_id: createBuildData.id,
        }));
        // await this;
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

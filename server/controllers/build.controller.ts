/* eslint-disable prettier/prettier */
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
  Param,
  Delete,
  Put,
  QueryParam,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import BuildService from "@/services/build.service";
import BoxService from "@/services/box.service";
import FlashCardService from "@/services/flashCards.service";
import authMiddleware from "@/middlewares/auth.middleware";
import { RequestWithUser } from "@/interfaces/auth.interface";
import { updateVideoBuildDto, videoBuildDto } from "@/dtos/videobuilds.dto";
import { IVideoBuild } from "@/interfaces/videoBuilds.interface";
import { google } from "googleapis";
import config from "@/configs";
@Controller("/build")
export class BuildController {
  private buildService = new BuildService();
  private boxService = new BoxService();
  private flashCardService = new FlashCardService();

  @Post("/create")
  @UseBefore(authMiddleware)
  @HttpCode(201)
  @OpenAPI({ summary: "Create a new build" })
  async createBuild(
    @Body() videoBuildData: any,
    @Req() req: Request | any,
    @Res() res: Response
  ) {
    try {
      videoBuildData.created_by = req.user.id;
      videoBuildData.updated_by = req.user.id;
      const createBuildData: IVideoBuild | null =
        await this.buildService.createBuild(videoBuildData);
       


      if (createBuildData && createBuildData.id && videoBuildData.boxes) {
        const newArr = videoBuildData.boxes.map((box:any) => ({
          ...box,
          build_id: createBuildData.id,
        }));
        await this.boxService.createBox(newArr);
        
      }
      if (createBuildData && createBuildData.id && videoBuildData.flashCards) {
        const newArr = videoBuildData.flashCards.map((card:any) => ({
          ...card,
          created_by: req.user.id,
          updated_by: req.user.id,
          build_id: createBuildData.id,
        }));
        await this.flashCardService.createBulkFlashCard(newArr);
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

  @Get("/url")
  @OpenAPI({ summary: "Get all build of users" })
  async getUsersBuildByUrl(
    @Req() req: Request | any,
    @Res() res: Response,
    @QueryParam("url") url: string
    // @Body()url:any
  ) {
    try {
      const videoUrl = url;
      const youtube = google.youtube({
        version: "v3",
        auth: config.youtubeApiKey,
      });
      const userBuild = await this.buildService.getUsersBuildByUrl(videoUrl);
      const response: any = await youtube.search.list({
        part: ["id,snippet"],
        q:
          userBuild && userBuild.length > 0 ? userBuild[0].video_url : videoUrl,
      });
      let finalDuration;
      const durationCalculation = (duration:any) => {
        let a = duration.match(/\d+/g);
        if (
          duration.indexOf("M") >= 0 &&
          duration.indexOf("H") == -1 &&
          duration.indexOf("S") == -1
        ) {
          a = [0, a[0], 0];
        }
        if (duration.indexOf("H") >= 0 && duration.indexOf("M") == -1) {
          a = [a[0], 0, a[1]];
        }
        if (
          duration.indexOf("H") >= 0 &&
          duration.indexOf("M") == -1 &&
          duration.indexOf("S") == -1
        ) {
          a = [a[0], 0, 0];
        }
        duration = 0;

        if (a.length == 3) {
          duration = duration + parseInt(a[0]) * 3600;
          duration = duration + parseInt(a[1]) * 60;
          duration = duration + parseInt(a[2]);
        }
        if (a.length == 2) {
          duration = duration + parseInt(a[0]) * 60;
          duration = duration + parseInt(a[1]);
        }
        if (a.length == 1) {
          duration = duration + parseInt(a[0]);
        }
        let minutes = Math.floor(duration / 60);
        duration = duration % 60;
        const hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        finalDuration = `${hours}:${minutes}:${duration}`;
        return finalDuration;
      };

      const titles = [];
      for (let i = 0; i < response.data.items.length; i++) {
        const item = response.data.items[i];
        const videoUrl = item.snippet.thumbnails.default.url;
        const splittedUrl = videoUrl.split("vi/");
        const result = splittedUrl.pop();
        const array1 = result.split("/de");
        const duration1 = await youtube.videos.list({
          id: array1[0],
          part: ["contentDetails"],
        });
        const youTubeFormatDuration =
        duration1 && duration1.data && duration1.data?.items && duration1.data?.items.length > 0 && duration1.data?.items[0]?.contentDetails?.duration;
        durationCalculation(youTubeFormatDuration);

        const data = {
          videoId: item.id.videoId,
          thumbnails: item.snippet.thumbnails.default,
          description: item.snippet.description,
          title: item.snippet.title,
          publishedAt: item.snippet.publishedAt,
          duration: finalDuration,
          test: array1[0],
          url: `https://www.youtube.com/embed/${array1[0]}`,
        };
        titles.push(data);
      }
      return { data: titles, box: userBuild, status: true };
    } catch (error) {
      return {
        error: {
          code: 500,
          message: (error as Error).message,
        },
      };
    }
  }

  @Put("/:id")
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: "Update build id of users" })
  async UpdateUsersBuild(
    @Req() req: Request | any,
    @Param("id") id: number,
    @Body() data: updateVideoBuildDto,
    @Res() res: Response
  ) {
    try {
      data.updated_by = req.user.id;
      const userBuild = await this.buildService.updateBuild(id, data);
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

  @Delete("/:id")
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: "Delete build id of users" })
  async DeleteUsersBuild(
    @Req() req: Request | any,
    @Param("id") id: number,
    @Res() res: Response
  ) {
    try {
      const userBuild = await this.buildService.deleteBuild(id);
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


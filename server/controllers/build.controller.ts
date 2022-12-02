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
  UploadedFile,
  QueryParam,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import FlashCardService from "@/services/flashCards.service";
import authMiddleware from "@/middlewares/auth.middleware";
import { flashcardsDto, updateflashcardsDto, flashCardResponseDto } from "@/dtos/flashcards.dto";
import { IFlashCards, IFlashCardsResponse } from "@/interfaces/flashCards.interface";
import { IVideoBuild } from "@/interfaces/videoBuilds.interface";
import { updateVideoBuildDto, videoBuildDto } from "@/dtos/videobuilds.dto";
import BuildService from "@/services/build.service"
import { google } from "googleapis";
import config from "@/configs";
import { RequestWithUser } from "@/interfaces/auth.interface";

@Controller("/build")
@UseBefore(authMiddleware)
export class FlashController {
  private buildService = new BuildService();
  private flashCardService = new FlashCardService();
  boxService: any;

  @Post("/create")
  @UseBefore(authMiddleware)
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
        await this.boxService.createBox(newArr);
      }
      if (createBuildData && createBuildData.id && videoBuildData.flashCards) {
        const newArr = videoBuildData.flashCards.map((card) => ({
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
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: "Get all build of users" })
  async getUsersBuild(@Req() req: Request | any, @Res() res: Response) {
    try {
      const user = req.user.id;
      console.log('>>>>>', user);

      const userBuild = await this.buildService.getBuildByUserId(user);
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

  @Get("/userInteractedBuild")
  @OpenAPI({ summary: "Get all users by Email" })
  async getUserInteractedBuild(
    @Req() req: RequestWithUser | any,
    @Res() res: Response
  ) {
    try {
      const userId = req.user.id;
      const user = await this.buildService.getUserInteractedBuild(userId);
      return user;
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
  @OpenAPI({ summary: "Get all build of users by Url" })
  async getUsersBuildByUrl(
    @Req() req: Request | any,
    @Res() res: Response,
    @QueryParam("url") url: string,
    @QueryParam("search") search?: string
  ) {
    try {
      const userBuild = await this.buildService.getUsersBuildByUrl(url, search);
      console.log('>>userBuild>>> ', userBuild, search);
      const searchedData = this.youtubeApiCall(url, userBuild, search).then(result => {
        console.log('///// ', result);
        return result;
      })
      console.log('SEARCHDATA', searchedData);
      return { data: searchedData, box: userBuild, status: true };
    } catch (error) {
      return {
        error: {
          code: 500,
          message: (error as Error).message,
        },
      };
    }
  }

  @OpenAPI({ summary: "YouTube Api Call" })
  async youtubeApiCall(url, userBuild, search) {
    try {
      console.log('URL* ', url);
      console.log('userBuild ', userBuild);
      console.log('search* ', search);
      const searchedData = [];
      const videoUrl = url;
      const youtube = google.youtube({
        version: "v3",
        auth: config.youtubeApiKey,
      });
      let finalDuration;
      const durationCalculation = (duration) => {
        var a = duration.match(/\d+/g);
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
        let hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        finalDuration = `${hours}:${minutes}:${duration}`;
        return finalDuration;
      };
      let youtubeData;
      if (userBuild && userBuild.length > 0) {
        await Promise.all(userBuild.map(async url => {
          youtubeData = await youtube.search.list({
            part: ["id,snippet"],
            q: url.video_url
          });
          await Promise.all(youtubeData.data.items.map(async (item) => {
            const videoUrl = item.snippet.thumbnails.default.url;
            const splittedUrl = videoUrl.split("vi/");
            const result = splittedUrl.pop();
            const array1 = result.split("/de");
            const duration1 = await youtube.videos.list({
              id: array1[0],
              part: ["contentDetails"],
            });
            const youTubeFormatDuration =
              await duration1.data.items[0].contentDetails.duration;
            durationCalculation(youTubeFormatDuration);

            let Filter = {
              videoId: item.id.videoId,
              thumbnails: item.snippet.thumbnails.default,
              description: item.snippet.description,
              title: item.snippet.title,
              publishedAt: item.snippet.publishedAt,
              duration: finalDuration,
              newVideoId: array1[0],
              url: `https://www.youtube.com/embed/${array1[0]}`,
            };
            searchedData.push(Filter)
          }))
        }));
      } else if (videoUrl || search) {
        const response: any = await youtube.search.list({
          part: ["id,snippet"],
          q: videoUrl,
        });
        for (let i = 0; i < response.data.items.length; i++) {
          let item = response.data.items[i];
          const videoUrl = item.snippet.thumbnails.default.url;
          const splittedUrl = videoUrl.split("vi/");
          const result = splittedUrl.pop();
          const array1 = result.split("/de");
          const duration1 = await youtube.videos.list({
            id: array1[0],
            part: ["contentDetails"],
          });
          const youTubeFormatDuration =
            duration1.data.items[0].contentDetails.duration;
          durationCalculation(youTubeFormatDuration);

          let data = {
            videoId: item.id.videoId,
            thumbnails: item.snippet.thumbnails.default,
            description: item.snippet.description,
            title: item.snippet.title,
            publishedAt: item.snippet.publishedAt,
            duration: finalDuration,
            newVideoId: array1[0],
            url: `https://www.youtube.com/embed/${array1[0]}`,
          };
          searchedData.push(data);
        }
      }
      console.log('SEARCHDATA ', searchedData);
      return searchedData;
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
  @OpenAPI({ summary: "Get all build of users by Id" })
  async getBuildById(@Req() req: Request | any, @Param('id') id: number, @Res() res: Response) {
    try {
      const BuildById = await this.buildService.getBuildById(id);
      return BuildById;
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
      data.created_by_user = req.user.id;
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





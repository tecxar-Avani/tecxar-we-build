/* eslint-disable prettier/prettier */
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
  QueryParam,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import FlashCardService from "@/services/flashCards.service";
import authMiddleware from "@/middlewares/auth.middleware";
import { IVideoBuild } from "@/interfaces/videoBuilds.interface";
import { updateVideoBuildDto, videoBuildDto } from "@/dtos/videobuilds.dto";
import BuildService from "@/services/build.service";
import { google } from "googleapis";
import config from "@/configs";
import { RequestWithUser } from "@/interfaces/auth.interface";
import BoxService from "@/services/box.service";
import BoxReviewService from "@/services/boxReview.service";

@Controller("/build")
export class FlashController {
  private buildService = new BuildService();
  private flashCardService = new FlashCardService();
  private boxService = new BoxService();
  private reviewService = new BoxReviewService();

  @Post("/create")
  @UseBefore(authMiddleware)
  @HttpCode(201)
  @OpenAPI({ summary: "Create a new build" })
  async createBuild(
    @Body() videoBuildData: videoBuildDto,
    @Req() req: RequestWithUser
  ) {
    try {
      const { searchedData, error } = await this.youtubeApiCall(
        videoBuildData.video_url
      );
      videoBuildData.created_by = req.user.id;
      videoBuildData.updated_by = req.user.id;

      if (searchedData && searchedData.length > 0) {
        videoBuildData.description = searchedData[0].description;
        videoBuildData.duration = searchedData[0].duration;
        videoBuildData.new_video_id = searchedData[0].newVideoId;
        videoBuildData.published_at = searchedData[0].publishedAt;
        videoBuildData.thumbnails = searchedData[0].thumbnails;
        videoBuildData.title = searchedData[0].title;
        videoBuildData.embed_url = searchedData[0].url;
        videoBuildData.video_id = searchedData[0].videoId;
      }
      const createBuildData: IVideoBuild | null =
        await this.buildService.createBuild(videoBuildData);

      if (createBuildData && createBuildData.id && videoBuildData.boxes) {
        const newArr = videoBuildData.boxes.map((box: any) => ({
          ...box,
          build_id: createBuildData.id,
        }));
        await this.boxService.createBox(newArr);
      }
      if (createBuildData && createBuildData.id && videoBuildData.flashCards) {
        const newArr = videoBuildData.flashCards.map((card: any) => ({
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
  async getUsersBuild(@Req() req: RequestWithUser) {
    try {
      const { id } = req.user;
      const userBuild = await this.buildService.getBuildByUserId(id);
      return { data: [], box: userBuild };
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
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: "Get all users by Email" })
  async getUserInteractedBuild(@Req() req: RequestWithUser) {
    try {
      const { id } = req.user;
      const userBuild = await this.buildService.getUserInteractedBuild(id);
      return { data: [], box: userBuild };
    } catch (error) {
      return {
        error: {
          code: 500,
          message: (error as Error).message,
        },
      };
    }
  }

  @Get("/totalbuilds")
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: "Get all build of users" })
  async getTotalBuilds(@Req() req: RequestWithUser) {
    try {
      const { id } = req.user;
      const boxbuildCount = await this.boxService.getTotalBuilds(id);
      const awernessCount = await this.reviewService.getTotalAwarenessById(id);
      const flashCardCount = await this.flashCardService.getTotalFlashCard(id);

      return { boxbuildCount, awernessCount, flashCardCount };
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
  @OpenAPI({ summary: "Search Url" })
  async getUsersBuildByUrl(
    @QueryParam("url") url: string,
    @QueryParam("search") search?: string
  ) {
    try {
      const userBuild = await this.buildService.getUsersBuildByUrl(url, search);
      if (userBuild && userBuild.length > 0) {
        return {
          status: true,
          data: [],
          box: search || url ? [] : userBuild,
          results: userBuild,
          allBuilds: [],
        };
      } else {
        if (url && url != undefined && url != "undefined") {
          const { searchedData, error } = await this.youtubeApiCall(url);

          if (searchedData && searchedData.length > 0) {
            return {
              status: true,
              data: searchedData,
              box: userBuild,
              allBuilds: [],
            };
          }
        } else {
          const allBuilds = await this.buildService.getAllBuilds();
          return {
            status: true,
            data: [],
            box: [],
            allBuilds: allBuilds,
          };
        }
      }
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
  async youtubeApiCall(url?: any) {
    try {
      const searchedData = [];
      const videoUrl = url;
      const youtube = google.youtube({
        version: "v3",
        auth: config.youtubeApiKey,
      });
      let finalDuration: any;
      const durationCalculation = (duration: any) => {
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
      if (videoUrl) {
        const videoIdToSearch = videoUrl && videoUrl.split("=").pop();
        const response: any =
          videoIdToSearch &&
          videoIdToSearch != undefined &&
          videoIdToSearch != "undefined" &&
          (await youtube.videos.list({
            part: ["snippet,contentDetails"],
            id: [`${videoIdToSearch}`],
          }));

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
            duration1?.data?.items &&
            duration1.data.items.length > 0 &&
            duration1.data.items[0].contentDetails?.duration;
          durationCalculation(youTubeFormatDuration);

          const data = {
            videoId: videoIdToSearch,
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
      return { searchedData, error: null };
    } catch (error) {
      return {
        searchedData: [],
        error: {
          code: 500,
          message: (error as Error).message,
        },
      };
    }
  }

  @Get("/getAllBuilds")
  @OpenAPI({ summary: "Get all build " })
  async getAllBuilds(@QueryParam("search") search?: string) {
    try {
      const userBuild = await this.buildService.getAllBuilds(search);

      return { status: true, box: userBuild };
    } catch (error) {
      return {
        error: {
          code: 500,
          message: (error as Error).message,
        },
      };
    }
  }

  @Get("/getOtherBuild")
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: "Get other's build " })
  async getOthersBuild(
    @Req() req: Request | any,
    @QueryParam("search") search?: string
  ) {
    try {
      const userId = req.user.id;
      const userBuild = await this.buildService.getAllBuilds(search, userId);
      return { status: true, box: userBuild };
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
  @OpenAPI({ summary: "Get build by Id" })
  async getBuildById(@Param("id") id: number) {
    try {
      const buildById = await this.buildService.getBuildById(id);
      return { status: true, data: buildById };
    } catch (error) {
      return {
        error: {
          code: 500,
          message: (error as Error).message,
        },
      };
    }
  }

  @Put("/update/:id")
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: "Update build id of users" })
  async UpdateUsersBuild(
    @Req() req: Request | any,
    @Param("id") id: number,
    @Body() data: updateVideoBuildDto
  ) {
    try {
      console.log("data", data);
      data.updated_by = req.user.id;
      // const userBuild = await this.buildService.updateBuild(id, data);
      return { data: [], message: "Build Updated successfully" };
    } catch (error) {
      return {
        error: {
          code: 500,
          message: (error as Error).message,
        },
      };
    }
  }

  @Delete("/deleteBuild/:id")
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: "Delete build id of users" })
  async DeleteUsersBuild(@Param("id") id: number) {
    try {
      const userBuild = await this.buildService.deleteBuild(id);
      return { userBuild, message: "Build deleted successfully" };
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

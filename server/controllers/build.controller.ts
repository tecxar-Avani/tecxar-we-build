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
import { updateVideoBuildDto } from "@/dtos/videobuilds.dto";
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
  async createBuild(@Body() videoBuildData: any, @Req() req: RequestWithUser) {
    try {
      videoBuildData.created_by = req.user.id;
      videoBuildData.updated_by = req.user.id;
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
      const { searchedData, error } = await this.youtubeApiCall(userBuild);
      return { data: searchedData, box: userBuild };
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
      const { searchedData, error } = await this.youtubeApiCall(userBuild);
      return { data: searchedData, box: userBuild };
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
      const { searchedData, error } = await this.youtubeApiCall(
        userBuild,
        search,
        url
      );
      if (searchedData && searchedData.length > 0) {
        return {
          status: true,
          data: searchedData,
          box: userBuild,
          search:
            search && search != undefined && search != "undefined"
              ? true
              : false,
          url: url && url != undefined && url != "undefined" ? true : false,
        };
      } else {
        const allBuilds = await this.buildService.getAllBuilds();
        const { searchedData, error } = await this.youtubeApiCall(
          allBuilds,
          search,
          url
        );
        return {
          status: true,
          data: searchedData,
          box: userBuild,
          allBuilds: allBuilds,
          search:
            search && search != undefined && search != "undefined"
              ? true
              : false,
          url: url && url != undefined && url != "undefined" ? true : false,
        };
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
  async youtubeApiCall(userBuild?: any, search?: any, url?: any) {
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
      let youtubeData;

      if (userBuild && userBuild.length > 0) {
        await Promise.all(
          userBuild.map(async (url: any) => {
            const urlIdToSearch =
              url.video_url && url.video_url.split("=").pop();

            youtubeData =
              urlIdToSearch &&
              (await youtube.videos.list({
                part: ["snippet,contentDetails"],
                id: [`${urlIdToSearch}`],
              }));

            await Promise.all(
              youtubeData?.data?.items && youtubeData.data.items.length > 0
                ? youtubeData.data.items.map(async (item: any) => {
                    const videoUrl = item?.snippet?.thumbnails?.default?.url;
                    const splittedUrl = videoUrl?.split("vi/");
                    const result = splittedUrl.pop();
                    const array1 = result?.split("/de");
                    const duration1 = await youtube.videos.list({
                      id: array1[0],
                      part: ["contentDetails"],
                    });
                    const youTubeFormatDuration =
                      (await duration1) &&
                      duration1.data &&
                      duration1.data.items &&
                      duration1.data.items.length > 0 &&
                      duration1.data.items[0]?.contentDetails?.duration;
                    durationCalculation(youTubeFormatDuration);

                    const filter = {
                      id: url.id,
                      videoId: urlIdToSearch,
                      thumbnails: item?.snippet?.thumbnails?.default,
                      description: item?.snippet?.description,
                      title: item?.snippet?.title,
                      publishedAt: item?.snippet?.publishedAt,
                      duration: finalDuration,
                      newVideoId: array1[0],
                      url: `https://www.youtube.com/embed/${array1[0]}`,
                    };
                    searchedData.push(filter);
                  })
                : []
            );
          })
        );
      } else if (videoUrl || search) {
        const videoIdToSearch = videoUrl && videoUrl.split("=").pop();
        const response: any = 
          videoIdToSearch &&
          videoIdToSearch != undefined &&
          videoIdToSearch != "undefined"
            ? await youtube.videos.list({
                part: ["snippet,contentDetails"],
                id: [`${videoIdToSearch}`],
              })
            : await youtube.search.list({
              part: ["id","snippet"],
              q: search,
              maxResults: 5,
            });
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
      let searchedResult;
      // const { searchedData, error } = await this.youtubeApiCall(
      //   userBuild,
      //   search
      // );
      // const searchedData = [
      //   {
      //     id: 58,
      //     videoId: "8CMmyBRqRHU",
      //     thumbnails: {
      //       url: "https://i.ytimg.com/vi/8CMmyBRqRHU/default.jpg",
      //       width: 120,
      //       height: 90,
      //     },
      //     description:
      //       'Dear all, Welcome to the new course - "Calculus using python" The aim of this course is to build the foundation for machine ...',
      //     title:
      //       "1.2 Code example - 1 : Calculus using Python for Data Science",
      //     publishedAt: "2022-12-06T17:18:58Z",
      //     duration: "0:3:16",
      //     newVideoId: "8CMmyBRqRHU",
      //     url: "https://www.youtube.com/embed/8CMmyBRqRHU",
      //   },
      //   {
      //     id: 59,
      //     videoId: "8CMmyBRqRHU",
      //     thumbnails: {
      //       url: "https://i.ytimg.com/vi/8CMmyBRqRHU/default.jpg",
      //       width: 120,
      //       height: 90,
      //     },
      //     description:
      //       'Dear all, Welcome to the new course - "Calculus using python" The aim of this course is to build the foundation for machine ...',
      //     title:
      //       "1.2 Code example - 1 : Calculus using Python for Data Science",
      //     publishedAt: "2022-12-06T17:18:58Z",
      //     duration: "0:3:16",
      //     newVideoId: "8CMmyBRqRHU",
      //     url: "https://www.youtube.com/embed/8CMmyBRqRHU",
      //   },
      //   {
      //     id: 54,
      //     videoId: "BkKm6Xo-cUk",
      //     thumbnails: {
      //       url: "https://i.ytimg.com/vi/BkKm6Xo-cUk/default.jpg",
      //       width: 120,
      //       height: 90,
      //     },
      //     description:
      //       "This video showcases the introduction to a Node training program and takes beginners to the next level. This is the start of a ...",
      //     title: "01 - Node training introduction",
      //     publishedAt: "2020-08-26T14:59:00Z",
      //     duration: "0:4:29",
      //     newVideoId: "BkKm6Xo-cUk",
      //     url: "https://www.youtube.com/embed/BkKm6Xo-cUk",
      //   },
      //   {
      //     id: 60,
      //     videoId: "BkKm6Xo-cUk",
      //     thumbnails: {
      //       url: "https://i.ytimg.com/vi/BkKm6Xo-cUk/default.jpg",
      //       width: 120,
      //       height: 90,
      //     },
      //     description:
      //       "This video showcases the introduction to a Node training program and takes beginners to the next level. This is the start of a ...",
      //     title: "01 - Node training introduction",
      //     publishedAt: "2020-08-26T14:59:00Z",
      //     duration: "0:4:29",
      //     newVideoId: "BkKm6Xo-cUk",
      //     url: "https://www.youtube.com/embed/BkKm6Xo-cUk",
      //   },
      //   {
      //     id: 57,
      //     videoId: "8CMmyBRqRHU",
      //     thumbnails: {
      //       url: "https://i.ytimg.com/vi/8CMmyBRqRHU/default.jpg",
      //       width: 120,
      //       height: 90,
      //     },
      //     description:
      //       'Dear all, Welcome to the new course - "Calculus using python" The aim of this course is to build the foundation for machine ...',
      //     title:
      //       "1.2 Code example - 1 : Calculus using Python for Data Science",
      //     publishedAt: "2022-12-06T17:18:58Z",
      //     duration: "0:3:16",
      //     newVideoId: "8CMmyBRqRHU",
      //     url: "https://www.youtube.com/embed/8CMmyBRqRHU",
      //   },
      //   {
      //     id: 61,
      //     videoId: "BkKm6Xo-cUk",
      //     thumbnails: {
      //       url: "https://i.ytimg.com/vi/BkKm6Xo-cUk/default.jpg",
      //       width: 120,
      //       height: 90,
      //     },
      //     description:
      //       "This video showcases the introduction to a Node training program and takes beginners to the next level. This is the start of a ...",
      //     title: "01 - Node training introduction",
      //     publishedAt: "2020-08-26T14:59:00Z",
      //     duration: "0:4:29",
      //     newVideoId: "BkKm6Xo-cUk",
      //     url: "https://www.youtube.com/embed/BkKm6Xo-cUk",
      //   },
      //   {
      //     id: 55,
      //     videoId: "TlB_eWDSMt4",
      //     thumbnails: {
      //       url: "https://i.ytimg.com/vi/TlB_eWDSMt4/default.jpg",
      //       width: 120,
      //       height: 90,
      //     },
      //     description:
      //       "Node.js Tutorial for Beginners: Learn Node in 1 Hour Get the complete Node course: http://bit.ly/2NfkpOC Subscribe for more ...",
      //     title: "Node.js Tutorial for Beginners: Learn Node in 1 Hour",
      //     publishedAt: "2018-02-21T23:57:12Z",
      //     duration: "1:18:16",
      //     newVideoId: "TlB_eWDSMt4",
      //     url: "https://www.youtube.com/embed/TlB_eWDSMt4",
      //   },
      //   {
      //     id: 55,
      //     videoId: "BLl32FvcdVM",
      //     thumbnails: {
      //       url: "https://i.ytimg.com/vi/BLl32FvcdVM/default.jpg",
      //       width: 120,
      //       height: 90,
      //     },
      //     description:
      //       "NodeJs crash course in Hindi: In this video, we will see everything you need to know about Node.js in Hindi. This node js tutorial ...",
      //     title: "Node Js Tutorial in Hindi 🔥🔥",
      //     publishedAt: "2021-06-21T12:06:01Z",
      //     duration: "1:48:50",
      //     newVideoId: "BLl32FvcdVM",
      //     url: "https://www.youtube.com/embed/BLl32FvcdVM",
      //   },
      //   {
      //     id: 55,
      //     videoId: "uVwtVBpw7RQ",
      //     thumbnails: {
      //       url: "https://i.ytimg.com/vi/uVwtVBpw7RQ/default.jpg",
      //       width: 120,
      //       height: 90,
      //     },
      //     description:
      //       "What is Node js? This short video explains it in 3 minutes. Node js tutorial for beginners: https://youtu.be/TlB_eWDSMt4 ...",
      //     title: "What is Node js?",
      //     publishedAt: "2018-01-23T23:51:31Z",
      //     duration: "0:3:43",
      //     newVideoId: "uVwtVBpw7RQ",
      //     url: "https://www.youtube.com/embed/uVwtVBpw7RQ",
      //   },
      //   {
      //     id: 55,
      //     videoId: "o3sAZFveLW4",
      //     thumbnails: {
      //       url: "https://i.ytimg.com/vi/o3sAZFveLW4/default.jpg",
      //       width: 120,
      //       height: 90,
      //     },
      //     description:
      //       "In this video we are going to learn node js in one single video. Node Js Tutorial in one video Content of this video: 00:00 ...",
      //     title:
      //       "🔥Node Js Tutorial in one video | Master Node JS in one video in Hindi",
      //     publishedAt: "2022-01-13T18:23:51Z",
      //     duration: "1:42:46",
      //     newVideoId: "o3sAZFveLW4",
      //     url: "https://www.youtube.com/embed/o3sAZFveLW4",
      //   },
      //   {
      //     id: 55,
      //     videoId: "W6NZfCO5SIk",
      //     thumbnails: {
      //       url: "https://i.ytimg.com/vi/W6NZfCO5SIk/default.jpg",
      //       width: 120,
      //       height: 90,
      //     },
      //     description:
      //       "Watch this JavaScript tutorial for beginners to learn JavaScript basics in one hour. Want to master JavaScript? Get my complete ...",
      //     title:
      //       "JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour",
      //     publishedAt: "2018-04-24T02:37:33Z",
      //     duration: "0:48:17",
      //     newVideoId: "W6NZfCO5SIk",
      //     url: "https://www.youtube.com/embed/W6NZfCO5SIk",
      //   },
      // ];
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
     
        data.created_by_user = req.user.id;
        const userBuild = await this.buildService.updateBuild(id, data);
        return { data: userBuild, message: "Build Updated successfully" };
      
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
  async DeleteUsersBuild(@Param("id") id: number) {
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

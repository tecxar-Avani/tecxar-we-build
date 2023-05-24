/* eslint-disable prettier/prettier */
import { Response } from "express";
import { Controller, Req, UseBefore, Res, Get } from "routing-controllers";
import {
  Authenticate,
  GoogleAuthentication,
} from "@/middlewares/google.middleware";
import config from "@/configs";
import { OpenAPI } from "routing-controllers-openapi";
import UserService from "@/services/users.service";
const JWT_KEY = config.jwt.secret;
import jwt from "jsonwebtoken";
import { RequestWithUser } from "@/interfaces/auth.interface";
import { IResponseBase } from "@/../@types/responses";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import API from "../../src/plugins/api";
import { videoBuildDto } from "@/dtos/videobuilds.dto";
import { google } from "googleapis";
import { IVideoBuild } from "@/interfaces/videoBuilds.interface";
import BuildService from "@/services/build.service";
import FlashCardService from "@/services/flashCards.service";
import BoxService from "@/services/box.service";
import { IBoxReviews } from "@/interfaces/boxreviews.interface";
import BoxReviewService from "@/services/boxReview.service";

@Controller()
export class AuthController {
  private userService = new UserService();
  private buildService = new BuildService();
  private flashCardService = new FlashCardService();
  private boxService = new BoxService();
  private reviewService = new BoxReviewService();

  @Get("/google")
  @UseBefore(Authenticate)
  async google() {}

  @Get("/google_callback")
  @OpenAPI({ summary: "google callback" })
  @UseBefore(GoogleAuthentication)
  async google_callback(
    @Req() req: RequestWithUser | any,
    @Res() res: Response
  ) {
    try {
      const lastPage = "?isLoggedIn";
      const userEmail = req.user._json.email;
      const userName = req.user._json.name;
      const googleProfileId = req.user._json.sub;
      const user = await this.userService.getUserByEmail(userEmail);
      if(!user){
        const data = {
          user_name: userName,
          profile_id: googleProfileId,
          email: userEmail,
          role_id: 2,
          is_blocked: 0,
          tag_line: "all the city with me",
        };
        const createUser = await this.userService.createUser(data);
        // req.session.dbUser = createUser;
        req.session.save();
        if (createUser && createUser.id) {
          req.user = createUser;
          const token = await jwt.sign(
            {
              id: createUser.id,
              email: userEmail,
              name: userName,
            },
            JWT_KEY,
            {
              expiresIn: "1d",
            }
          );
          res
            .cookie("authorization", token, {
              expires: new Date(Date.now() + 2700000),
            })
            if(req?.cookies?.OrderData){
              const orderData = JSON.parse(req?.cookies?.OrderData)
              await this.createBuild(orderData,req,res)
            }
            if(req?.cookies?.awarenessData){
              const awarenessDatas = JSON.parse(req?.cookies?.awarenessData)
              await this.createReview(awarenessDatas,req,res)
            }
          res.redirect(`${config.urlHost}`);
        } else {
          res.redirect(`${config.urlHost}`);
        }
      }
      else if(user && user.is_blocked == 2){
        //if user is deleted
        const data = {
          is_blocked: 0,
        };
        const userId = user.id;
        const updateUser = await this.userService.updateUserProfile(
          userId,
          data
        );
        // req.session.dbUser = updateUser;
        req.session.user = updateUser;
        req.session.save();
        if (updateUser) {
          req.user = updateUser;
          const token = await jwt.sign(
            {
              id: user.id,
              email: userEmail,
              name: userName,
            },
            JWT_KEY,
            {
              expiresIn: "1d",
            }
          );
          res
            .cookie("authorization", token, {
              expires: new Date(Date.now() + 2700000),
            })
            if(req?.cookies?.OrderData){
              const orderData = JSON.parse(req?.cookies?.OrderData)
              await this.createBuild(orderData,req,res)
            }
            if(req?.cookies?.awarenessData){
              const awarenessDatas = JSON.parse(req?.cookies?.awarenessData)
              await this.createReview(awarenessDatas,req,res)
            }
            res.redirect(`${config.urlHost}`);
        } else {
          res.redirect(`${config.urlHost}`);
        }
      }
      else if (user && user.is_blocked == 0) {
        //if user is unblocked
        // req.session.dbUser = user;
        req.session.user = user;
        req.user = user;
        req.session.save();
        const token = await jwt.sign(
          {
            id: user.id,
            email: userEmail,
            name: userName,
          },
          JWT_KEY,
          {
            expiresIn: "1d",
          }
        );
        res
          .cookie("authorization", token, {
            expires: new Date(Date.now() + 2700000),
          })
          if(req?.cookies?.OrderData){
            const orderData = JSON.parse(req?.cookies?.OrderData)
            await this.createBuild(orderData,req,res)
          }
          if(req?.cookies?.awarenessData){
            const awarenessDatas = JSON.parse(req?.cookies?.awarenessData)
            await this.createReview(awarenessDatas,req,res)
          }
          res.redirect(`${config.urlHost}`);
      } 
      else if(user && user.is_blocked == 1){
        //if user is blocked
        res.send("You are blocked by Admin");
      }
       else {
        res.redirect(`${config.urlHost}`);
      }
      return res;
    } catch (error) {
      return res.redirect(`${config.urlHost}`);
      // return {
      //   error: {
      //     code: 500,
      //     message: (error as Error).message,
      //   },
      // };
    }
  }
  async createBuild(
   videoBuildData: videoBuildDto | any,req: RequestWithUser,res:Response
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
      res.cookie("OrderData", "",  {expires: new Date(0)});
      res.cookie("orderMessage","Video Build created successfully.",{ expires: new Date(Date.now() + 7000)})
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
            thumbnails: item.snippet.thumbnails.medium,
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
  async createReview(reviewData: any,req: RequestWithUser,res:Response) {
    try {
      reviewData.created_by = req.user.id;
      const createReviewData: IBoxReviews | null =
        await this.reviewService.createBoxReview(reviewData);
      res.cookie("awarenessData", "",  {expires: new Date(0)});
      res.cookie("awareMessage","Review created successfully.",{ expires: new Date(Date.now() + 7000)})

      return {
        status: true,
        data: createReviewData,
        message: "Review created successfully.",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { error: { code: 500, message: error.message } };
      }
    }
  }
  @Get("/logout")
  @OpenAPI({ summary: "User Logout" })
  async logOut(@Req() req: RequestWithUser) {
    try {
      if (req.isAuthenticated()) {
        // req.logOut(() => console.log("log out"));
        // delete req.session.dbUser
        // req.session.save();
        req.session.destroy(() => {});
      }
      const response: IResponseBase = { status: true, redirect: "/" };
      return {
        status: response.status,
        data: response.redirect,
        message: "You are successfully logged out",
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error instanceof Error) {
          return { error: { code: 500, message: error.message } };
        }
      }
    }
  }
  @Get("/google_fail")
  async google_fail() {
    return { data: "google authentication failed" };
  }
}

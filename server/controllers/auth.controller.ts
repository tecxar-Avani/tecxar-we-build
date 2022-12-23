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

@Controller()
export class AuthController {
  private userService = new UserService();

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
      const lastPage = "/";
      const userEmail = req.user._json.email;
      const userName = req.user._json.name;
      const googleProfileId = req.user._json.sub;
      const user = await this.userService.getUserByEmail(userEmail);
      if (user && user.is_blocked == 0) {
        req.user = user;
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
         .redirect(`${config.urlHost}${lastPage}`);
        //  .redirect(`https://webuild.tecxar.io/${lastPage}`);
      } else if(!user){
        const data = {
          user_name: userName,
          profile_id: googleProfileId,
          email: userEmail,
          role_id: 2,
          is_blocked: 0,
        };
        const createUser = await this.userService.createUser(data);
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
              .redirect(`${config.urlHost}${lastPage}`);
            // .redirect(`https://webuild.tecxar.io/${lastPage}`);
        } else {
          res
            .redirect(`${config.urlHost}${lastPage}`);
            //.redirect(`https://webuild.tecxar.io/${lastPage}`);
        }
      }
      else if(user && user.is_blocked == 2){
        const data = {
          is_blocked: 0,
        };
        const userId = user.id
        const updateUser = await this.userService.updateUserProfile(userId,data);
        if (updateUser) {
          req.user = user;
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
            //  .redirect(`${config.urlHost}${lastPage}`);
              .redirect(`https://webuild.tecxar.io/${lastPage}`);
        } else {
          res
          //  .redirect(`${config.urlHost}${lastPage}`);
            .redirect(`https://webuild.tecxar.io/${lastPage}`);
        }
      }
      else{
        // res.redirect(`${config.urlHost}${lastPage}`)
        res.send("You are blocked by Admin")
        // .redirect(`https://webuild.tecxar.io/${lastPage}`);
        return{
          message:"You are blocked by Admin"
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

  @Get("/google_fail")
  async google_fail() {
    return { data: "google authentication failed" };
  }
}

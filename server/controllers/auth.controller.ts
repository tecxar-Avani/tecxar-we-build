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
      const lastPage = "?isLoggedIn";
      const userEmail = req.user._json.email;
      const userName = req.user._json.name;
      const googleProfileId = req.user._json.sub;
      const user = await this.userService.getUserByEmail(userEmail);
      console.log("req.header",req.header)
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
            // .redirect(`${config.urlHost}`);
        } else {
          // res.redirect(`${config.urlHost}`);
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
            // .redirect(`${config.urlHost}`);
        } else {
          // res.redirect(`${config.urlHost}`);
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
          // .redirect(`${config.urlHost}`);
      } 
      else if(user && user.is_blocked == 1){
        //if user is blocked
        res.send("You are blocked by Admin");
      }
       else {
        // res.redirect(`${config.urlHost}`);
      }
      console.log('@@@@@@@@@2=====>',res);
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

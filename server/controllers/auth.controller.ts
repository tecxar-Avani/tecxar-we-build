import { Response } from "express";
import { Controller, Req, UseBefore, Res, Get } from "routing-controllers";
import {
  Authenticate,
  GoogleAuthentication,
} from "@/middlewares/google.middleware";
import config from "@/configs";
import { OpenAPI } from "routing-controllers-openapi";
import UserService from "@/services/users.service";

@Controller("/auth")
export class AuthController {
  private userService = new UserService();

  @Get("/google")
  @UseBefore(Authenticate)
  async google() {}

  @Get("/google_callback")
  @OpenAPI({ summary: "google callback" })
  @UseBefore(GoogleAuthentication)
  async google_callback(@Req() req: Request | any, @Res() res: Response) {
    try {
      const userEmail = req.user._json.email;
      const userName = req.user._json.name;
      const googleProfileId = req.user._json.sub;

      const user = await this.userService.getUserByEmail(userEmail);
      if (user) {
        return user;
      } else {
        const data = {
          user_name: userName,
          profile_id: googleProfileId,
          email: userEmail,
          role_id: 2,
          is_blocked: 0,
        };
        const createUser = await this.userService.createUser(data);
        return createUser;
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
  async google_fail(@Req() req: Request | any) {
    return { data: "google authentication failed" };
  }
}

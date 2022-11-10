import { Response } from "express";
import { Controller, Req, UseBefore, Res, Get } from "routing-controllers";
import {
  Authenticate,
  GoogleAuthentication,
} from "@/middlewares/google.middleware";
import config from "@/configs";
import { OpenAPI } from "routing-controllers-openapi";

@Controller()
export class AuthController {
  @Get("/google")
  @UseBefore(Authenticate)
  async google() {}

  @Get("/google_callback")
  @OpenAPI({ summary: "google callback" })
  @UseBefore(GoogleAuthentication)
  async google_callback(@Req() req: Request | any, @Res() res: Response) {
    try {
      const res = req.user._json.email;

      return res;
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

import { Response } from "express";
import {
  Controller,
  Req,
  UseBefore,
  Res,
  Get,
  Authorized,
} from "routing-controllers";
import {
  Authenticate,
  GoogleAuthentication,
} from "@/middlewares/google.middleware";
import config from "@/configs";
import { OpenAPI } from "routing-controllers-openapi";
import UserService from "@/services/users.service";

@Controller("/users")
export class UserController {
  private userService = new UserService();

  @Get("/")
  @OpenAPI({ summary: "Get all users" })
  async getAllUsers(@Req() req: Request | any, @Res() res: Response) {
    try {
      const user = await this.userService.getUsers();

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
}

/* eslint-disable prettier/prettier */
import { Response } from "express";
import { Controller, Req, UseBefore, Res, Get, Put, Body, Param } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import UserService from "@/services/users.service";
import authMiddleware from "@/middlewares/auth.middleware";
import { RequestWithUser } from "@/interfaces/auth.interface";
import { UpdateUserDto } from "@/dtos/users.dto";

@Controller("/users")
@UseBefore(authMiddleware)
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

  @Get("/userByEmail")
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: "Get all users by Email" })
  async getUserByEmail(
    @Req() req: RequestWithUser | any,
    @Res() res: Response
  ) {
    try {
      const userEmail = req.user.email;
      const user = await this.userService.getUserByEmail(userEmail);
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

  @Put("/:id")
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: "Update users Profile" })
  async updateUsersProfile(
    @Req() req: Request | any,
    @Param("id") id: number,
    @Body() data: UpdateUserDto,
    @Res() res: Response
  ) {
    try {
      const userBuild = await this.userService.updateUserProfile(id, data);

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

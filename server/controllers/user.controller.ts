/* eslint-disable prettier/prettier */
import { Controller, Req, UseBefore, Get, Put, Body, Param } from "routing-controllers";
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
  async getAllUsers() {
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
    @Req() req: RequestWithUser,
  ) {
    try {
      const {email} = req.user;
      return await this.userService.getUserByEmail(email);
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
    @Param("id") id: number,
    @Body() data: UpdateUserDto,
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

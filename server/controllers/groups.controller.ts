/* eslint-disable prettier/prettier */
import { Response } from "express";
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
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import GroupService from "@/services/groups.service";
import authMiddleware from "@/middlewares/auth.middleware";
import { groupsDto } from "@/dtos/groups.dto";
import { RequestWithUser } from "@/interfaces/auth.interface";
import { IGroups } from "@/interfaces/groups.interface";

@Controller("/group")
export class GroupController {
  private groupService = new GroupService();

  @Post("/create")
   @UseBefore(authMiddleware)
  @HttpCode(201)
  @OpenAPI({ summary: "Create a new flash card" })
  async createFlashCard(
    @Body() groupData: any,
    @Req() req: RequestWithUser
  ) {
    try {
       
      //should make build id and created by id dynamic
    //   groupData.created_by = req.user.id;
      const createGroupData: any | null =
        await this.groupService.createGroup(groupData);
        if(createGroupData.id){
            const arr = []
            await groupData.boxes.length > 0  &&  groupData.boxes.map((a) => arr.push({group_id : createGroupData.id,box_id:a}))
            await this.groupService.createGroupBoxes(arr);
        }
      return {
        status: true,
        data: createGroupData,
        message: "Group created successfully.",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { error: { code: 500, message: error.message } };
      }
    }
  }

  @Get("/:id")
  @OpenAPI({ summary: "Get group by build" })
  async getGroupBoxesByBuild(@Param("id") id: number) {
    try {
      const groupBox = await this.groupService.getGroupBoxes(id);
      return { status: true, groupBox };
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

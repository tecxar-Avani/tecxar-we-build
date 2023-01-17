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
import { groupsDto, updateGroupsDto } from "@/dtos/groups.dto";
import { RequestWithUser } from "@/interfaces/auth.interface";
import { IGroups } from "@/interfaces/groups.interface";
import { updateBoxesgroupDto } from "@/dtos/boxesgroups.dto";
import _, { result } from "lodash";

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
      const createGroupData: IGroups | null =
        await this.groupService.createGroup(groupData);
        
        if(createGroupData?.id){       
            const arr:any= []     
             groupData.boxes.length > 0  &&  groupData.boxes.map((a:any) =>{ 
              arr.push({group_id : createGroupData.id,box_id:a})
            return arr})  
          
         const boxData = await this.groupService.createGroupBoxes(arr);
            return {
              status: true,
              data: createGroupData,
              message: "Group created successfully.",
            };
        }
      
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
      // const groupIdArr =await groupBox?.length>0 ? _.groupBy(groupBox, "group_id") : [];
      //  const results = await groupIdArr &&  _.toArray( groupIdArr )
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

  @Put("/update/:id")
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: "Update group data of users" })
  async updateGroup(
    @Param("id") id: number,
    @Body() data: updateBoxesgroupDto | any,
  ) {
   

    try {
      const groupBox = await this.groupService.getGroupByBox(data.boxes);
    
      const createGroupData: IGroups | null =
        await this.groupService.createGroup(data);
        if(createGroupData?.id){       
            const arr:any = []     
            data.boxes.length > 0  &&  data.boxes.map((a:any) =>{ 
              arr.push({group_id : createGroupData.id,box_id:a})
            return arr})  
         const boxData = await this.groupService.createGroupBoxes(arr);
        
            return {
              status: true,
              data: createGroupData,
              message: "Group created successfully.",
            };
        
     }
    //   return { userGroup, message: "Group updated successfully" };
    } catch (error) {
      return {
        error: {
          code: 500,
          message: (error as Error).message,
        },
      };
    }
  }

  @Delete("/deleteGroups/:id")
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: "Delete group id of build" })
  async DeleteGroupsBuild(@Param("id") id: number) {
    try {
    const buildGroup = await this.groupService.getGroupByBuildId(id);
      return { buildGroup, message: "All Group deleted successfully" };
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

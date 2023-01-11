/* eslint-disable prettier/prettier */
import { HttpException } from "@/exceptions/HttpException";
import { IGroups } from "@/interfaces/groups.interface";
import { IBoxesGroups, IGroupBoxData } from "@/interfaces/boxesgroups.interface";
import Groups from "@/models/groups.model";
import DB from "@databases";
import { isEmpty } from "class-validator";
import { col, QueryTypes } from "sequelize";

class GroupService {
  private group = DB.group;
  private boxGroups = DB.boxGroups;

//   private flashCardsResponse = DB.flashCardsResponse;

  public async createGroup(
    groupData: IGroups
  ): Promise<IGroups | null> {
    if (isEmpty(groupData)) {
      throw new HttpException(400, "Enter the group data");
    }
    const createGroupData: IGroups | null = await this.group.create(
      { ...groupData },
      { raw: true }
    );
  
    return createGroupData
  }

  public async createGroupBoxes(
    boxes: IBoxesGroups | any
  ): Promise<IBoxesGroups[] | null> {
    if (isEmpty(boxes)) {
      throw new HttpException(400, "Enter the group data");
    }
    const createGroupBoxData: IBoxesGroups[] | null = await this.boxGroups.bulkCreate(boxes);
  
    return createGroupBoxData
  }

  public async getGroupBoxes(
    buildId: number
  ): Promise<IGroupBoxData[] | any>{
    const query = `SELECT g.title,bg.box_id as boxId, bg.group_id,b.description as message,b.build_id,b.sorting_order as id

    FROM boxes_groups As bg

    LEFT JOIN  boxes AS b ON bg.box_id = b.id

     LEFT JOIN all_groups AS g ON bg.group_id = g.id

     where build_id = ${buildId}
     group by box_id`;
     const getGroupBoxData: IGroupBoxData[] = await DB.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return getGroupBoxData;
  }


}
export default GroupService;

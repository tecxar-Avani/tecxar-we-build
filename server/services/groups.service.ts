/* eslint-disable prettier/prettier */
import { HttpException } from "@/exceptions/HttpException";
import { IGroups } from "@/interfaces/groups.interface";
import { IBoxesGroups, IDeleteGroups, IGroupBoxData } from "@/interfaces/boxesgroups.interface";
import Groups from "@/models/groups.model";
import DB from "@databases";
import { isEmpty } from "class-validator";
import { col, QueryTypes} from "sequelize";
const { Op } = require('sequelize');

class GroupService {
  private group = DB.group;
  private boxGroups = DB.boxGroups;
  private boxes = DB.box

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
    
const getGroupId = await this.group.findOne({where:boxes[0].group_id})


if(getGroupId){

  const createGroupBoxData: any[] | null = await this.boxGroups.bulkCreate(boxes);
  

}
    

    return []
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

  public async getGroupByBox(
    boxId: number
  ): Promise<IGroupBoxData | any>{
    const getGroupBox = await this.boxGroups.findAll({attributes : ["group_id"],where : {box_id:boxId},group:["group_id"],raw:true,logging:console.log})
    if(getGroupBox) {
      const result = await getGroupBox.map(a => a.group_id);
      await this.boxGroups.destroy({where : {group_id:result}})
    }
    
    return getGroupBox;
  }

  public async deleteGroupById(
    groupId:number
  ):Promise<IDeleteGroups[] | any>{
    if (isEmpty(groupId)) throw new HttpException(400, 'Enter ID');
    const getGroupsBoxes : IBoxesGroups[] | null = await this.boxGroups.findAll({where : {group_id: {[Op.in]: [groupId]} }}) 
    if(!getGroupsBoxes) return false;
    await this.boxGroups.destroy({where : {group_id:groupId}})
    const getGroups : IGroups[] | null = await this.group.findAll({where : {id: {[Op.in]: [groupId]} },}) 
    if(!getGroups) return false;
    await this.group.destroy({where : {id:groupId}})
  }

  public async getGroupByBuildId(
    buildId: number
  ): Promise<IGroupBoxData | any>{
    const getBox = await this.boxes.findAll({attributes : ["id"],where : {build_id:buildId},raw:true,logging:console.log})
    if(getBox) {
      const result = await getBox.map(a => a.id);
      const getGroupBox = await this.boxGroups.findAll({attributes : ["group_id"],where : {box_id:result},group:["group_id"],raw:true,logging:console.log})

      if(getGroupBox) {
        const data = await getGroupBox.map(a => a.group_id);
        await this.group.destroy({where : {id:data}})
      }
      return getGroupBox;
    }
  
  }
  public async updateGroupTitle(
    id: number,
    data: any
  ): Promise<IGroups | null> {
    const GroupTitleByUpdate: any | null = await this.group.update(
      { ...data },
      { where: { id: id } }
    );

    if (!GroupTitleByUpdate) {
      return null;
    } else {
      return GroupTitleByUpdate;
    }
  }

  public async deleteGroupsByBuildId(id: number): Promise<IGroups[] | null> {
    const groupDelete: any | null = await this.group.destroy({
      where: { id: id },
    });
    if (!groupDelete) {
      return null;
    } else {
      return groupDelete;
    }
  }
}
export default GroupService;

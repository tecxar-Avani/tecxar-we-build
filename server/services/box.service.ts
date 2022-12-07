/* eslint-disable prettier/prettier */
import { HttpException } from "@/exceptions/HttpException";
import { IBoxes } from "@/interfaces/boxes.interface";
import DB from "@databases";
import { isEmpty } from "class-validator";
import { QueryTypes } from "sequelize";

class BoxService {
  private box = DB.box;

  public async createBox(boxData: IBoxes | any): Promise<IBoxes[] | null> {

    if (isEmpty(boxData)) {
      throw new HttpException(400, "Enter the build data");
    }
    const createBuildData: IBoxes[] = await this.box.bulkCreate(boxData);
    console.log("QQQQQQQQQQQQQQQQQQQQQQQQ", createBuildData)
    return createBuildData;
  }
  
  public async getBuilds(): Promise<IBoxes[] | null> {
    const videoBuilds: IBoxes[] | null = await this.box.findAll({
      raw: true,
    });
    if (!videoBuilds) {
      return null;
    } else {
      return videoBuilds;
    }
  }

  public async getTotalBuilds(userId:any): Promise<IBoxes[] | any> { 
      const query = `SELECT COUNT(*) AS boxbuild_total FROM video_builds AS vb
      LEFT JOIN boxes box on vb.id = box.build_id
      where vb.created_by = ${userId} `;
      const BuildById: IBoxes[] = await DB.sequelize.query(query, { type: QueryTypes.SELECT });
      return BuildById;
  }
}
export default BoxService;

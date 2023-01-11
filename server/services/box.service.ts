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
    const createBoxData: IBoxes[] = await this.box.bulkCreate(boxData);
    return createBoxData;
  }

  public async createSingleBox(boxData: IBoxes | any): Promise<IBoxes | null> {
    if (isEmpty(boxData)) {
      throw new HttpException(400, "Enter the build data");
    }
    const createBoxData: IBoxes = await this.box.create(boxData);
    return createBoxData;
  }

  public async getBoxes(): Promise<IBoxes[] | null> {
    const boxes: IBoxes[] | null = await this.box.findAll({
      raw: true,
    });
    if (!boxes) {
      return null;
    } else {
      return boxes;
    }
  }

  public async getBoxesById(
    buildId: number | undefined,
    sorting_order: number | undefined
  ): Promise<IBoxes[] | null> {
    const boxes: IBoxes[] | null = await this.box.findAll({
      where: { sorting_order: sorting_order, build_id: buildId },
      raw: true,
    });
    if (!boxes) {
      return null;
    } else {
      return boxes;
    }
  }

  // public async getBoxesByBuildId(
  //   buildId: number | undefined
  // ): Promise<IBoxes[] | null> {
  //   const boxes: IBoxes[] | null = await this.box.findAll({
  //     where: { build_id: buildId },
  //     raw: true,
  //   });
  //   if (!boxes) {
  //     return null;
  //   } else {
  //     return boxes;
  //   }
  // }
  public async getBoxesByBuildId(buildId: any): Promise<IBoxes[] | null> {
    const query = `SELECT sorting_order As id , description as message ,id as boxId  FROM webuild.boxes where build_id = ${buildId}`;
    const boxes: IBoxes[] = await DB.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return boxes;
  }
  

  public async getTotalBoxes(userId: any): Promise<IBoxes[] | any> {
    const query = `SELECT COUNT(*) AS boxes FROM video_builds AS vb
      LEFT JOIN boxes box on vb.id = box.build_id
      where vb.created_by = ${userId} `;
    const boxByUserId: IBoxes[] = await DB.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return boxByUserId;
  }

  public async updateBox(id: number, data: any): Promise<IBoxes[] | null> {
   
    const boxUpdate: any | null = await this.box.update(
      { ...data },
      { where: { id: id} }
    );
    if (!boxUpdate) {
      return null;
    } else {
      return boxUpdate;
    }
  }
}
export default BoxService;

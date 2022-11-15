import { HttpException } from "@/exceptions/HttpException";
import { IBoxes } from "@/interfaces/boxes.interface";
import { IVideoBuild } from "@/interfaces/videoBuilds.interface";
import DB from "@databases";
import { isEmpty } from "class-validator";

class BoxService {
  private box = DB.box;

  public async createBox(boxData: IBoxes | any): Promise<IBoxes[] | null> {
    if (isEmpty(boxData)) {
      throw new HttpException(400, "Enter the build data");
    }
    const createBuildData: IBoxes[] = await this.box.bulkCreate(boxData);
    return createBuildData;
  }

  
  public async getBuild(userId: number): Promise<IVideoBuild[] | null> {
    const videoBuilds: IVideoBuild[] | null = await this.videoBuild.findAll({
      where: { created_by: userId },
      raw: true,
    });
    if (!videoBuilds) {
      return null;
    } else {
      return videoBuilds;
    }
  }
}

export default BoxService;

import { HttpException } from "@/exceptions/HttpException";
import { IBoxes } from "@/interfaces/boxes.interface";
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

}
export default BoxService;

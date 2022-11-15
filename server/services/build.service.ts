
import { IVideoBuild } from "@/interfaces/videoBuilds.interface";
import DB from "@databases";

class BuildService {
  private videoBuild = DB.videoBuild;

  public async getBuild(userId:number): Promise<IVideoBuild[] | null> {
    const videoBuilds: IVideoBuild[] | null = await this.videoBuild.findAll({
        where:{created_by:userId},
      raw:true
    });
    if (!videoBuilds) {
      return null;
    } else {
      return videoBuilds;
    }
  }
}

export default BuildService;


import { HttpException } from "@/exceptions/HttpException";
import { IVideoBuild } from "@/interfaces/videoBuilds.interface";
import DB from "@databases";
import { isEmpty } from "class-validator";

class BuildService {
  private videoBuild = DB.videoBuild;

  public async createBuild(
    buildData: IVideoBuild
  ): Promise<IVideoBuild | null> {
    if (isEmpty(buildData)) {
      throw new HttpException(400, "Enter the build data");
    }
    const createBuildData: IVideoBuild | null = await this.videoBuild.create(
      { ...buildData },
      { raw: true }
    );
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

  public async getUsersBuildByUrl(
    url: string
  ): Promise<IVideoBuild[] | null> {
    const videoBuilds: IVideoBuild[] | null = await this.videoBuild.findAll({
      where: { video_url:url },
      raw: true,
    });
    if (!videoBuilds) {
      return null;
    } else {
      return videoBuilds;
    }
  }
}

export default BuildService;

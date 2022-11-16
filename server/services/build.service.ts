
import { HttpException } from "@/exceptions/HttpException";
import { IVideoBuild } from "@/interfaces/videoBuilds.interface";
import DB from "@databases";
import { isEmpty } from "class-validator";
import { where } from "sequelize";

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

  public async deleteBuild(id: number): Promise<IVideoBuild[] | null> {
    const videoBuildsDelete: any | null = await this.videoBuild.destroy({
      where: { id: id },
    });
    if (!videoBuildsDelete) {
      return null;
    } else {
      return videoBuildsDelete;
    }
  }

  public async updateBuild(id: number, data): Promise<IVideoBuild | null> {
    const videoBuildsUpdate: any | null = await this.videoBuild.update({ ...data },
      { where: { id: id } }
    );
    if (!videoBuildsUpdate) {
      return null;
    } else {
      return videoBuildsUpdate;
    }
  }
}

export default BuildService;

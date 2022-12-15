/* eslint-disable prettier/prettier */
import { HttpException } from "@/exceptions/HttpException";
import { IVideoBuild } from "@/interfaces/videoBuilds.interface";
import DB from "@databases";
import { isEmpty } from "class-validator";
import { Op, QueryTypes } from "sequelize";

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

  public async getBuildByUserId(userId: number): Promise<IVideoBuild[] | null> {
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

  public async getBuildById(id: number): Promise<IVideoBuild[] | null> {
    const query = `SELECT box.description,box.id,box.sorting_order,vb.created_by
    FROM video_builds AS vb
    LEFT JOIN boxes box on vb.id = box.build_id
    where vb.id = ${id} `;
    const BuildById: IVideoBuild[] = await DB.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return BuildById;
  }

  public async getUserInteractedBuild(
    userId: number
  ): Promise<IVideoBuild[] | null> {
    const query = `SELECT vb.video_url
    FROM video_builds AS vb
    LEFT JOIN flash_cards fc on vb.id = fc.build_id
    LEFT JOIN boxes box on vb.id = box.build_id
    LEFT JOIN box_reviews br on box.id = br.box_id
    where br.created_by = ${userId} OR fc.created_by =${userId} `;
    const UserInteractedId: IVideoBuild[] = await DB.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return UserInteractedId;
  }

  public async getUsersBuildByUrl(
    url: string,
    search?: string
  ): Promise<IVideoBuild[] | null> {
    const searchFilter = [];
    const where = [];
    if (search != "" && search != "undefined" && search != undefined) {
      search = search.toLowerCase();
      searchFilter.push(
        {
          difficulty_level: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          potential_polarization: {
            [Op.like]: `%${search}%`,
          },
        }
      );
      if (
        search === "low" ||
        search === "medium" ||
        search === "high" ||
        search === "very_high"
      ) {
        search = search.toLowerCase();
        searchFilter.push({
          potential_polarization: {
            [Op.eq]: `${search}`,
          },
        });
      }
      where.push({ [Op.or]: searchFilter });
    }
  
    if (url) {
      where.push({ video_url: url });
    }
    const option: {
      nest?: boolean;
      subQuery: boolean;
      attributes: any;
      where: any;
      raw: boolean;
      order: any;
      logging:any
    } = {
      attributes: [
        "id",
        "video_url",
        "type_of_video",
        "created_by",
        "difficulty_level",
        "potential_polarization",
      ],
      nest: true,
      where: where,
      order: [["id", "ASC"]],
      raw: true,
      subQuery: false,
     logging:console.log
    }
    const videoBuilds: IVideoBuild[] | null = await this.videoBuild.findAll(option);
    return videoBuilds;
  }

  public async getAllBuilds(search?: any): Promise<IVideoBuild[] | null> {
    const searchFilter = [];
    if (search != "" && search != "undefined" && search != undefined) {
      search = search.toLowerCase();
      searchFilter.push(
        {
          difficulty_level: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          potential_polarization: {
            [Op.like]: `%${search}%`,
          },
        }
      );
      if (
        search === "low" ||
        search === "medium" ||
        search === "high" ||
        search === "very_high"
      ) {
        search = search.toLowerCase();
        searchFilter.push({
          potential_polarization: {
            [Op.eq]: `${search}`,
          },
        });
      }
    }
    const option: {
      nest?: boolean;
      subQuery: boolean;
      attributes: any;
      raw: boolean;
      limit: number;
      order: any;
    } = {
      attributes: [
        "id",
        "video_url",
        "type_of_video",
        "created_by",
        "difficulty_level",
        "potential_polarization",
      ],
      nest: true,
      order: [["id", "DESC"]],
      raw: true,
      limit: 10,
      subQuery: false,
    };
    const videoBuilds: IVideoBuild[] | null = await this.videoBuild.findAll(
      option
    );
    return videoBuilds;
  }

  public async updateBuild(id: number, data:any): Promise<IVideoBuild | null> {
    const videoBuildsUpdate: any | null = await this.videoBuild.update({ ...data },
      { where: { id: id } }
    );
    if (!videoBuildsUpdate) {
      return null;
    } else {
      return videoBuildsUpdate;
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
}
export default BuildService;

/* eslint-disable prettier/prettier */
import { HttpException } from "@/exceptions/HttpException";
import { IVideoBuild } from "@/interfaces/videoBuilds.interface";
import DB from "@databases";
import { isEmpty } from "class-validator";
import { Op, QueryTypes, fn, col, where, Sequelize } from "sequelize";

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
      logging: true,
    });

    if (!videoBuilds) {
      return null;
    } else {
      return videoBuilds;
    }
  }

  public async getBuildById(id: number): Promise<IVideoBuild[] | null> {
    const query = `SELECT box.description,box.id,box.sorting_order,vb.created_by,
    vb.id As vb_id,
    vb.video_url,
    vb.type_of_video,
    vb.difficulty_level,
    vb.potential_polarization,
    vb.title,
    vb.description as vb_description,
    vb.duration,
    vb.new_video_id,
    vb.published_at,
    vb.thumbnails,
    vb.embed_url,
    vb.video_id,
    vb.video_description
    FROM video_builds AS vb
    LEFT JOIN boxes box on vb.id = box.build_id
    where vb.id = ${id}
    order by box.sorting_order `;
    const BuildById: IVideoBuild[] = await DB.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return BuildById;
  }

  public async getUserInteractedBuild(
    userId: number
  ): Promise<IVideoBuild[] | null> {
    const query = `SELECT vb.*
    FROM video_builds AS vb
    LEFT JOIN flash_cards fc on vb.id = fc.build_id
    LEFT JOIN boxes box on vb.id = box.build_id
    LEFT JOIN box_reviews br on box.id = br.box_id
    where (br.created_by = ${userId} OR fc.created_by = ${userId}) AND vb.created_by != ${userId}
    group by vb.id; `;
    const UserInteractedId: IVideoBuild[] = await DB.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return UserInteractedId;
  }

  public async getUsersBuildByUrl(
    url?: string,
    search?: string
  ): Promise<IVideoBuild[] | null> {
    const searchFilter = [];
    const where = [{}];
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
        },
        Sequelize.where(Sequelize.fn("lower", Sequelize.col("type_of_video")), {
          [Op.like]: `%${search}%`,
        }),
        Sequelize.where(Sequelize.fn("lower", Sequelize.col("title")), {
          [Op.like]: `%${search}%`,
        }),
        Sequelize.where(Sequelize.fn("lower", Sequelize.col("description")), {
          [Op.like]: `%${search}%`,
        })
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

    if (url && url != "undefined" && url != undefined) {
      where.push({ video_url: url });
    }

    const option: {
      nest?: boolean;
      subQuery: boolean;
      attributes: any;
      where: any;
      raw: boolean;
      order: any;
      logging?: any;
    } = {
      attributes: [
        "id",
        "video_url",
        "type_of_video",
        "created_by",
        "difficulty_level",
        "potential_polarization",
        "provider",
        "description",
        "duration",
        "new_video_id",
        "published_at",
        "thumbnails",
        "title",
        "embed_url",
        "video_id",
        "created_by",
        "updated_by",
        "createdAt",
        "updatedAt",
      ],
      nest: true,
      where: where,
      order: [["id", "ASC"]],
      raw: true,
      subQuery: false,
    };

    const videoBuilds: IVideoBuild[] | null = await this.videoBuild.findAll(
      option
    );
    return videoBuilds;
  }

  public async getAllBuilds(
    search?: any,
    userId?: number
  ): Promise<IVideoBuild[] | null> {
    const searchFilter = [];
    let whereStatement = {};
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
        },
        Sequelize.where(Sequelize.fn("lower", Sequelize.col("type_of_video")), {
          [Op.like]: `%${search}%`,
        }),
        Sequelize.where(Sequelize.fn("lower", Sequelize.col("title")), {
          [Op.like]: `%${search}%`,
        }),

        Sequelize.where(Sequelize.fn("lower", Sequelize.col("description")), {
          [Op.like]: `%${search}%`,
        })
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

      where.push({
        [Op.or]: searchFilter,
      });
    }

    if (userId && userId != undefined) {
      where.push({ created_by: { [Op.not]: userId } });
    }
    whereStatement = {
      [Op.and]: where,
    };
    const option: {
      nest?: boolean;
      subQuery: boolean;
      attributes: any;
      raw: boolean;
      limit: number;
      order: any;
      where: any;
      logging?: any;
    } = {
      attributes: [
        "id",
        "video_url",
        "type_of_video",
        "created_by",
        "difficulty_level",
        "potential_polarization",
        "title",
        "description",
        "duration",
        "new_video_id",
        "published_at",
        "thumbnails",
        "embed_url",
        "video_id",
      ],
      where: whereStatement,
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

  public async updateBuild(id: number, data: any): Promise<IVideoBuild | null> {
    const videoBuildsUpdate: any | null = await this.videoBuild.update(
      { ...data },
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

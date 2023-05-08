/* eslint-disable prettier/prettier */
import { ICreateUser, IUpdateUser } from "@/interfaces/users.interface";
import Boxes from "@/models/boxes.model";
import VideoBuilds from "@/models/videoBuilds.model ";
import DB from "@databases";
import { HttpException } from "@exceptions/HttpException";
import { isEmpty } from "@utils/util";
import { Op } from "sequelize";
import { QueryTypes } from "sequelize";

class UserService {
  private users = DB.users;
  
  public async createUser(userData: ICreateUser): Promise<ICreateUser | null> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not user");
    const userCreated: any | null = await this.users.create(userData);
    return userCreated;
  }

  public async getUserByEmail(email: string): Promise<ICreateUser | undefined> {
    if (isEmpty(email)) {
      throw new HttpException(400, "Enter ID");
    }
    const user: ICreateUser | null = await this.users.findOne({
      where: { email: email },
      // include: [{
      //   model: VideoBuilds,
      //   where: { id : { [Op.eq]:  }  }
      // }]
      raw: true,
    });
    if (user) {
      return user;
    } 
  }

  public async getUsers(): Promise<ICreateUser[] | null> {
    const query = `SELECT 
    COUNT(b.id) AS box,
    (Select COUNT(*) from box_reviews WHERE created_by = u.id) AS awareness,
    u.id,
    u.user_name,
    u.tag_line,
    u.email,
    u.is_blocked,
    u.role_id
FROM
    users u
        LEFT JOIN
    video_builds vb ON u.id = vb.created_by
        LEFT JOIN
    boxes b ON vb.id = b.build_id 
WHERE
    u.is_blocked = 0 OR u.is_blocked = 1
GROUP BY u.id
ORDER BY u.role_id ASC`;
    const users: ICreateUser[] = await DB.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });  
      return users; 
  };



  
  public async updateUserProfile(id: number, data:any): Promise<IUpdateUser | null> {
    const updateuserProfile: any| null = await this.users.update(data ,
      { where: { id : id } }
    );
    if (!updateuserProfile) {
      return null;
    } else {
      return updateuserProfile;
    }
  }
}

export default UserService;

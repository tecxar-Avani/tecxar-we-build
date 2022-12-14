/* eslint-disable prettier/prettier */
import { ICreateUser, IUpdateUser } from "@/interfaces/users.interface";
import DB from "@databases";
import { HttpException } from "@exceptions/HttpException";
import { isEmpty } from "@utils/util";
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
      raw: true,
    });
    if (user) {
      return user;
    } 
  }

  public async getUsers(): Promise<ICreateUser[] | null> {
    const query = `select Count(br.id) AS awareness,Count(b.id) AS box,u.id,u.user_name,u.tag_line,u.email,u.is_blocked from users u
    left join box_reviews br on u.id = br.created_by
    left join video_builds vb on u.id = vb.created_by
    left join boxes b on vb.id=b.build_id
    group by u.id `;
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

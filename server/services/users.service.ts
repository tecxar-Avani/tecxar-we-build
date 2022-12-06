/* eslint-disable prettier/prettier */
import { ICreateUser, IUpdateUser } from "@/interfaces/users.interface";
import DB from "@databases";
import { HttpException } from "@exceptions/HttpException";
import { isEmpty } from "@utils/util";

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
    const user: ICreateUser[] | null = await this.users.findAll({
      where: { is_blocked: 0 },raw:true
    });
    if (!user) {
      return null;
    } else {
      return user;
    }
  }
  
  public async updateUserProfile(id: number, data): Promise<IUpdateUser | null> {
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

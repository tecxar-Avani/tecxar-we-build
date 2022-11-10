import { ICreateUser } from "@/interfaces/users.interface";
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

  public async getUserByEmail(
    email: string
  ): Promise<ICreateUser | null> {
    if (isEmpty(email)) {
      throw new HttpException(400, "Enter ID");
    }
    const user: ICreateUser | null =
      await this.users.findOne({
        where: { email: email },
      });
    if (!user) {
      return null;
    } else {
      return user
    }
  }
}

export default UserService;

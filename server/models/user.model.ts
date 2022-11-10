import { Optional } from "sequelize";
import {
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  Table,
  Default,
} from "sequelize-typescript";
import { ICreateUser } from "@/interfaces/users.interface";
import Role from "@/models/roles.model";
export type UsersAttributes = Optional<ICreateUser, "id">;
@Table({
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  tableName: "users",
})
export default class User
  extends Model<ICreateUser, UsersAttributes>
  implements ICreateUser
{
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  public id: number;

  @AllowNull(false)
  @ForeignKey(() => Role)
  @Column(DataType.INTEGER)
  public role_id: number;
  @BelongsTo(() => Role)
  public roles: Role;

  @Column(DataType.STRING)
  public user_name: string;

  @Column(DataType.STRING)
  public tag_line: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public profile_id: string;

  @Column(DataType.TINYINT)
  public is_blocked: number;

  @Column(DataType.BLOB)
  public profile_image: any;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  public updated_by: number;
  @BelongsTo(() => User)
  public updated_by_user: User;

  @Column 
   public createdAt!: Date;

  @Column
  public updatedAt!: Date;
}

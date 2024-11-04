import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../config/database";
import { UserRole } from "../enums/user-role.enum";

export interface UserData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserAttributes extends UserData {
  id: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: UserRole;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 255] },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [6, 255] },
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.USER,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "users",
    timestamps: true,
    paranoid: true,
  }
);

export default User;

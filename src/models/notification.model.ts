import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../config/database";
import User from "./user.model";

export interface NotificationData {
  title: string;
  message: string;
  dateTime: Date;
  userId: string;
  read: boolean;
}

export interface NotificationAttributes extends NotificationData {
  id: string;
}

export interface NotificationCreationAttributes
  extends Optional<NotificationAttributes, "id"> {}

class Notification
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes
{
  public id!: string;
  public title!: string;
  public message!: string;
  public dateTime!: Date;
  public userId!: string;
  public read!: boolean;
}

Notification.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "notifications",
    timestamps: true,
    paranoid: true,
  }
);

Notification.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Notification, {
  foreignKey: "userId",
  sourceKey: "id",
  as: "notifications",
});

export default Notification;

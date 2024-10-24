import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../config/database";

export enum DeviceType {
  NODE = "node",
  GATEWAY = "gateway",
}

export enum DeviceStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  MAINTENANCE = "maintenance",
}

export interface DeviceData {
  serialNumber: string;
  status: DeviceStatus;
  battery_level: number;
  type: DeviceType;
}

interface DeviceAttributes extends DeviceData {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface DeviceCreationAttributes extends Optional<DeviceAttributes, "id"> {}

class Device
  extends Model<DeviceAttributes, DeviceCreationAttributes>
  implements DeviceAttributes
{
  public id!: number;
  public serialNumber!: string;
  public status!: DeviceStatus;
  public battery_level!: number;
  public type!: DeviceType;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;
}

Device.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(DeviceStatus)),
      allowNull: false,
      defaultValue: DeviceStatus.INACTIVE,
    },
    battery_level: {
      type: DataTypes.NUMBER,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(DeviceType)),
      allowNull: false,
      defaultValue: DeviceType.NODE,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "devices",
    timestamps: true,
    paranoid: true,
  }
);

export default Device;

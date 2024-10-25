import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../config/database";
import { DeviceType } from "../enums/device-type.enum";
import { DeviceStatus } from "../enums/device-status.enum";

export interface DeviceData {
  serialNumber: string;
  status: DeviceStatus;
  batteryLevel: number;
  type: DeviceType;
}

export interface DeviceAttributes extends DeviceData {
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
  public batteryLevel!: number;
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
    batteryLevel: {
      type: DataTypes.INTEGER,
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

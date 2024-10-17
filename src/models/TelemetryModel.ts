import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import sequelizeConnection from "../config/database";
import Device from "./DeviceModel";

interface TelemetryAttributes {
  id: number;
  topic: string;
  message: {
    temperature: number;
    heartRate: number;
    latitude: number;
    longitude: number;
  };
  deviceId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface TelemetryCreationAttributes
  extends Optional<TelemetryAttributes, "id"> {}

class Telemetry
  extends Model<TelemetryAttributes, TelemetryCreationAttributes>
  implements TelemetryAttributes
{
  public id!: number;
  public topic!: string;
  public message!: {
    temperature: number;
    heartRate: number;
    latitude: number;
    longitude: number;
  };
  public deviceId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;
}

Telemetry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    deviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Device,
        key: "id",
      },
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
    tableName: "telemetry",
    timestamps: true,
    paranoid: true,
  }
);

Telemetry.belongsTo(Device, {
  foreignKey: "deviceId",
  as: "device",
});

export default Telemetry;

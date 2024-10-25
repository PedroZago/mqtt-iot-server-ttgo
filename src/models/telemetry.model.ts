import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../config/database";
import Device from "./device.model";

export interface MessageData {
  temperature: number;
  heartRate: number;
  latitude: number;
  longitude: number;
}

export interface TelemetryData {
  topic: string;
  message: MessageData;
  deviceId: number;
}

export interface TelemetryAttributes extends TelemetryData {
  id: number;
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
  public message!: MessageData;
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
      validate: { len: [1, 255] },
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

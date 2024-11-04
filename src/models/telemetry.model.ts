import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../config/database";
import Device from "./device.model";

export interface MessageData {
  temperature: number;
  heartRate: number;
  behavior: string;
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
}

export interface TelemetryData {
  topic: string;
  message: MessageData;
  deviceId: string;
}

export interface TelemetryAttributes extends TelemetryData {
  id: string;
}

interface TelemetryCreationAttributes
  extends Optional<TelemetryAttributes, "id"> {}

class Telemetry
  extends Model<TelemetryAttributes, TelemetryCreationAttributes>
  implements TelemetryAttributes
{
  public id!: string;
  public topic!: string;
  public message!: MessageData;
  public deviceId!: string;
}

Telemetry.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Device,
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "telemetries",
    timestamps: true,
    paranoid: true,
  }
);

Telemetry.belongsTo(Device, {
  foreignKey: "deviceId",
  as: "device",
});
Device.hasMany(Telemetry, {
  foreignKey: "deviceId",
  sourceKey: "id",
  as: "telemetries",
});

export default Telemetry;

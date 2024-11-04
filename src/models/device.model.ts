import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../config/database";
import Animal from "./animal.model";
import { DeviceType } from "../enums/device-type.enum";
import { DeviceStatus } from "../enums/device-status.enum";

export interface DeviceData {
  serialNumber: string;
  status: DeviceStatus;
  model: string;
  batteryLevel?: number;
  type?: DeviceType;
  gatewayId?: string;
  animalId?: string;
  activationDate?: Date;
}

export interface DeviceAttributes extends DeviceData {
  id: string;
}

export interface DeviceCreationAttributes
  extends Optional<DeviceAttributes, "id"> {}

class Device
  extends Model<DeviceAttributes, DeviceCreationAttributes>
  implements DeviceAttributes
{
  public id!: string;
  public serialNumber!: string;
  public status!: DeviceStatus;
  public model!: string;
  public batteryLevel?: number;
  public type?: DeviceType;
  public gatewayId?: string;
  public animalId?: string;
  public activationDate?: Date;
}

Device.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batteryLevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 0, max: 100 },
    },
    type: {
      type: DataTypes.ENUM(...Object.values(DeviceType)),
      allowNull: true,
      defaultValue: DeviceType.NODE,
    },
    gatewayId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Device,
        key: "id",
      },
    },
    animalId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Animal,
        key: "id",
      },
    },
    activationDate: {
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

Device.belongsTo(Device, { foreignKey: "gatewayId", as: "gateway" });
Device.hasMany(Device, {
  foreignKey: "gatewayId",
  sourceKey: "id",
  as: "nodes",
});

Device.belongsTo(Animal, { foreignKey: "animalId", as: "animal" });
Animal.hasMany(Device, {
  foreignKey: "animalId",
  sourceKey: "id",
  as: "devices",
});

export default Device;

import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../config/database";

export interface SpecieData {
  name: string;
  description?: string;
}

export interface SpecieAttributes extends SpecieData {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface SpecieCreationAttributes extends Optional<SpecieAttributes, "id"> {}

class Specie
  extends Model<SpecieAttributes, SpecieCreationAttributes>
  implements SpecieAttributes
{
  public id!: number;
  public name!: string;
  public description?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Specie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "Specie",
    paranoid: true,
    timestamps: true,
  }
);

export default Specie;

import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config";

export class SpeciesModel extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
}

SpeciesModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Species",
    tableName: "Species",
    timestamps: true,
  }
);

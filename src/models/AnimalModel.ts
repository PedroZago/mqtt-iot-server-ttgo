import { Model, DataTypes } from "sequelize";
import sequelize from "../database";
import { SpeciesModel } from "./SpeciesModel";

export class AnimalModel extends Model {
  public id!: number;
  public tag_id!: string;
  public name!: string;
  public speciesId!: number;
  public breed?: string;
  public age?: number;
  public weight?: number;
  public health_status?: string;
  public additional_info?: any;
}

AnimalModel.init(
  {
    tag_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    speciesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SpeciesModel,
        key: "id",
      },
    },
    breed: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.FLOAT,
    },
    health_status: {
      type: DataTypes.STRING,
    },
    additional_info: {
      type: DataTypes.JSONB,
    },
  },
  {
    sequelize,
    modelName: "Animal",
    tableName: "Animals",
    timestamps: true,
  }
);

AnimalModel.belongsTo(SpeciesModel, { foreignKey: "speciesId" });

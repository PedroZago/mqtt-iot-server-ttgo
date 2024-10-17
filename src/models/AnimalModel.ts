import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../config/database";
import Species from "./SpeciesModel";

interface AnimalAttributes {
  id: number;
  name: string;
  speciesId: number;
  breed?: string;
  birthDate?: Date;
  weight?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface AnimalCreationModel extends Optional<AnimalAttributes, "id"> {}

class Animal
  extends Model<AnimalAttributes, AnimalCreationModel>
  implements AnimalAttributes
{
  public id!: number;
  public name!: string;
  public speciesId!: number;
  public breed?: string;
  public birthDate?: Date;
  public weight?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Animal.init(
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
    speciesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Species,
        key: "id",
      },
    },
    breed: {
      type: DataTypes.STRING,
    },
    birthDate: {
      type: DataTypes.DATE,
    },
    weight: {
      type: DataTypes.NUMBER,
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
    tableName: "Animals",
    paranoid: true,
    timestamps: true,
  }
);

Animal.belongsTo(Species, { foreignKey: "speciesId", as: "species" });

export default Animal;

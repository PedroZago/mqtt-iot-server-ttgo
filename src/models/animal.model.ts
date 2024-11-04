import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../config/database";
import Specie from "./specie.model";

export interface AnimalData {
  name: string;
  specieId: string;
  breed?: string;
  birthDate?: Date;
  weight?: number;
}

export interface AnimalAttributes extends AnimalData {
  id: string;
}

export interface AnimalCreationModel extends Optional<AnimalAttributes, "id"> {}

class Animal
  extends Model<AnimalAttributes, AnimalCreationModel>
  implements AnimalAttributes
{
  public id!: string;
  public name!: string;
  public specieId!: string;
  public breed?: string;
  public birthDate?: Date;
  public weight?: number;
}

Animal.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 255] },
    },
    specieId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Specie,
        key: "id",
      },
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { len: [1, 255] },
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: { min: 0 },
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "animals",
    timestamps: true,
    paranoid: true,
  }
);

Animal.belongsTo(Specie, { foreignKey: "specieId", as: "specie" });
Specie.hasMany(Animal, {
  foreignKey: "specieId",
  sourceKey: "id",
  as: "animals",
});

export default Animal;

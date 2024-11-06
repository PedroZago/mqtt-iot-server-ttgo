import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../config/database";

export interface BreedData {
  name: string;
  description: string;
}

export interface BreedAttributes extends BreedData {
  id: string;
}

export interface BreedCreationAttributes
  extends Optional<BreedAttributes, "id"> {}

class Breed
  extends Model<BreedAttributes, BreedCreationAttributes>
  implements BreedAttributes
{
  public id!: string;
  public name!: string;
  public description!: string;
}

Breed.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "breeds",
    timestamps: true,
    paranoid: true,
  }
);

export default Breed;

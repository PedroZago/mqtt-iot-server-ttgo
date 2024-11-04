import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../config/database";

export interface SpecieData {
  name: string;
  description: string;
}

export interface SpecieAttributes extends SpecieData {
  id: string;
}

export interface SpecieCreationAttributes
  extends Optional<SpecieAttributes, "id"> {}

class Specie
  extends Model<SpecieAttributes, SpecieCreationAttributes>
  implements SpecieAttributes
{
  public id!: string;
  public name!: string;
  public description!: string;
}

Specie.init(
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
    tableName: "species",
    timestamps: true,
    paranoid: true,
  }
);

export default Specie;

import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../config/database";
import Specie from "./specie.model";
import Breed from "./breed.model";
import { AnimalSex } from "../enums/animal-sex.enum";

export interface AnimalData {
  name: string;
  specieId: string;
  breedId: string;
  sex: AnimalSex;
  birthDate: Date;
  weight: number;
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
  public breedId!: string;
  public sex!: AnimalSex;
  public birthDate!: Date;
  public weight!: number;
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
    breedId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Breed,
        key: "id",
      },
    },
    sex: {
      type: DataTypes.ENUM(...Object.values(AnimalSex)),
      allowNull: false,
      defaultValue: AnimalSex.OTHER,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isBefore: new Date().toISOString(),
      },
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "animals",
    timestamps: true,
    paranoid: true,
    getterMethods: {
      age(): number {
        return new Date().getFullYear() - this.birthDate.getFullYear();
      },
    },
  }
);

Animal.belongsTo(Specie, { foreignKey: "specieId", as: "specie" });
Specie.hasMany(Animal, {
  foreignKey: "specieId",
  sourceKey: "id",
  as: "animals",
});

Animal.belongsTo(Breed, { foreignKey: "breedId", as: "breed" });
Breed.hasMany(Animal, {
  foreignKey: "breedId",
  sourceKey: "id",
  as: "animals",
});

export default Animal;

import Animal, {
  AnimalData,
  AnimalAttributes,
} from "../../models/animal.model";
import Breed from "../../models/breed.model";
import Specie from "../../models/specie.model";
import { IAnimalRepository } from "../interfaces/animal.repository.interface";

export class AnimalRepository implements IAnimalRepository {
  async findAll(limit: number, offset: number): Promise<AnimalAttributes[]> {
    return Animal.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      include: [
        {
          model: Specie,
          as: "specie",
          attributes: ["id", "name"],
        },
        {
          model: Breed,
          as: "breed",
          attributes: ["id", "name"],
        },
      ],
      limit,
      offset,
    });
  }

  async findById(id: string): Promise<AnimalAttributes | null> {
    return Animal.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      include: [
        {
          model: Specie,
          as: "specie",
          attributes: ["id", "name"],
        },
        {
          model: Breed,
          as: "breed",
          attributes: ["id", "name"],
        },
      ],
    });
  }

  async create(animalData: AnimalData): Promise<AnimalAttributes> {
    const animal = await Animal.create(animalData);
    return animal.get({ plain: true });
  }

  async update(
    id: string,
    animalData: AnimalData
  ): Promise<AnimalAttributes | null> {
    const animal = await Animal.findByPk(id);
    if (animal) {
      await animal.update(animalData);
      return animal.get({ plain: true });
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    const animal = await Animal.findByPk(id);
    if (animal) {
      await animal.destroy();
    }
  }
}

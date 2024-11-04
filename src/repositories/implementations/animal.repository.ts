import Animal, {
  AnimalData,
  AnimalAttributes,
} from "../../models/animal.model";
import Specie from "../../models/specie.model";
import { IAnimalRepository } from "../interfaces/animal.repository.interface";

export class AnimalRepository implements IAnimalRepository {
  async findAll(limit: number, offset: number): Promise<AnimalAttributes[]> {
    return Animal.findAll({
      include: [
        {
          model: Specie,
          as: "specie",
          attributes: ["id", "name"],
        },
      ],
      limit,
      offset,
    });
  }

  async findById(id: string): Promise<AnimalAttributes | null> {
    return Animal.findByPk(id, {
      include: [
        {
          model: Specie,
          as: "specie",
          attributes: ["id", "name"],
        },
      ],
    });
  }

  async create(AnimalData: AnimalData): Promise<AnimalAttributes> {
    return Animal.create(AnimalData);
  }

  async update(
    id: string,
    AnimalData: AnimalData
  ): Promise<AnimalAttributes | null> {
    const animal = await Animal.findByPk(id);
    if (animal) {
      return animal.update(AnimalData);
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

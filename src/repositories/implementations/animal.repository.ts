import Animal, {
  AnimalData,
  AnimalAttributes,
} from "../../models/animal.model";
import { IAnimalRepository } from "../interfaces/animal.repository.interface";

export class AnimalRepository implements IAnimalRepository {
  async findAll(): Promise<AnimalAttributes[]> {
    return Animal.findAll();
  }

  async findById(id: number): Promise<AnimalAttributes | null> {
    return Animal.findByPk(id);
  }

  async create(AnimalData: AnimalData): Promise<AnimalAttributes> {
    return Animal.create(AnimalData);
  }

  async update(
    id: number,
    AnimalData: AnimalData
  ): Promise<AnimalAttributes | null> {
    const animal = await Animal.findByPk(id);
    if (animal) {
      return animal.update(AnimalData);
    }
    return null;
  }

  async delete(id: number): Promise<void> {
    const animal = await Animal.findByPk(id);
    if (animal) {
      await animal.destroy();
    }
  }
}

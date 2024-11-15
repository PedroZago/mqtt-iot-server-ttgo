import Breed, { BreedData, BreedAttributes } from "../../models/breed.model";
import { IBreedRepository } from "../interfaces/breed.repository.interface";

export class BreedRepository implements IBreedRepository {
  async findAll(): Promise<BreedAttributes[]> {
    return Breed.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });
  }

  async findById(id: string): Promise<BreedAttributes | null> {
    return Breed.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });
  }

  async create(breedData: BreedData): Promise<BreedAttributes> {
    const breed = await Breed.create(breedData);
    return breed.get({ plain: true });
  }

  async update(
    id: string,
    breedData: BreedData
  ): Promise<BreedAttributes | null> {
    const breed = await Breed.findByPk(id);
    if (breed) {
      await breed.update(breedData);
      return breed.get({ plain: true });
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    const breed = await Breed.findByPk(id);
    if (breed) {
      await breed.destroy();
    }
  }
}

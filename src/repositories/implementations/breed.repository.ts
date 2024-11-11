import Breed, { BreedData, BreedAttributes } from "../../models/breed.model";
import { IBreedRepository } from "../interfaces/breed.repository.interface";

export class BreedRepository implements IBreedRepository {
  async findAll(): Promise<BreedAttributes[]> {
    return Breed.findAll();
  }

  async findById(id: string): Promise<BreedAttributes | null> {
    return Breed.findByPk(id);
  }

  async create(breedData: BreedData): Promise<BreedAttributes> {
    return Breed.create(breedData);
  }

  async update(
    id: string,
    breedData: BreedData
  ): Promise<BreedAttributes | null> {
    const breed = await Breed.findByPk(id);
    if (breed) {
      return breed.update(breedData);
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

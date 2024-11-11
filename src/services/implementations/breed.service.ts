import { BreedRepository } from "../../repositories/implementations/breed.repository";
import { BreedData, BreedAttributes } from "../../models/breed.model";
import { IBreedService } from "../interfaces/breed.service.interface";

export class BreedService implements IBreedService {
  private BreedRepository: BreedRepository;

  constructor(BreedRepository: BreedRepository) {
    this.BreedRepository = BreedRepository;
  }

  async getAllBreeds(): Promise<BreedAttributes[]> {
    return this.BreedRepository.findAll();
  }

  async getBreedById(id: string): Promise<BreedAttributes | null> {
    return this.BreedRepository.findById(id);
  }

  async createBreed(breedData: BreedData): Promise<BreedAttributes> {
    return this.BreedRepository.create(breedData);
  }

  async updateBreed(
    id: string,
    breedData: BreedData
  ): Promise<BreedAttributes | null> {
    return this.BreedRepository.update(id, breedData);
  }

  async deleteBreed(id: string): Promise<void> {
    return this.BreedRepository.delete(id);
  }
}

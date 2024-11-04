import { AnimalRepository } from "../../repositories/implementations/animal.repository";
import { AnimalData, AnimalAttributes } from "../../models/animal.model";
import { IAnimalService } from "../interfaces/animal.service.interface";

export class AnimalService implements IAnimalService {
  private AnimalRepository: AnimalRepository;

  constructor(AnimalRepository: AnimalRepository) {
    this.AnimalRepository = AnimalRepository;
  }

  async getAllAnimals(
    limit: number,
    offset: number
  ): Promise<AnimalAttributes[]> {
    return this.AnimalRepository.findAll(limit, offset);
  }

  async getAnimalById(id: string): Promise<AnimalAttributes | null> {
    return this.AnimalRepository.findById(id);
  }

  async createAnimal(AnimalData: AnimalData): Promise<AnimalAttributes> {
    return this.AnimalRepository.create(AnimalData);
  }

  async updateAnimal(
    id: string,
    AnimalData: AnimalData
  ): Promise<AnimalAttributes | null> {
    return this.AnimalRepository.update(id, AnimalData);
  }

  async deleteAnimal(id: string): Promise<void> {
    return this.AnimalRepository.delete(id);
  }
}

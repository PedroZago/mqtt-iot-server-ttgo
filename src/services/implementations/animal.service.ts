import { AnimalRepository } from "../../repositories/implementations/animal.repository";
import { AnimalData, AnimalAttributes } from "../../models/animal.model";
import { IAnimalService } from "../interfaces/animal.service.interface";

export class AnimalService implements IAnimalService {
  private AnimalRepository: AnimalRepository;

  constructor(AnimalRepository: AnimalRepository) {
    this.AnimalRepository = AnimalRepository;
  }

  async getAllAnimals(): Promise<AnimalAttributes[]> {
    return this.AnimalRepository.findAll();
  }

  async getAnimalById(id: number): Promise<AnimalAttributes | null> {
    return this.AnimalRepository.findById(id);
  }

  async createAnimal(AnimalData: AnimalData): Promise<AnimalAttributes> {
    return this.AnimalRepository.create(AnimalData);
  }

  async updateAnimal(
    id: number,
    AnimalData: AnimalData
  ): Promise<AnimalAttributes | null> {
    return this.AnimalRepository.update(id, AnimalData);
  }

  async deleteAnimal(id: number): Promise<void> {
    return this.AnimalRepository.delete(id);
  }
}

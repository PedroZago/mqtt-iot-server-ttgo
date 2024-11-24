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
  ): Promise<{
    data: AnimalAttributes[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    const { data, total } = await this.AnimalRepository.findAll(limit, offset);

    const totalPages = Math.ceil(total / limit);
    const currentPage = Math.floor(offset / limit);

    return {
      data,
      total,
      totalPages,
      currentPage,
    };
  }

  async getAnimalById(id: string): Promise<AnimalAttributes | null> {
    return this.AnimalRepository.findById(id);
  }

  async createAnimal(animalData: AnimalData): Promise<AnimalAttributes> {
    return this.AnimalRepository.create(animalData);
  }

  async updateAnimal(
    id: string,
    animalData: AnimalData
  ): Promise<AnimalAttributes | null> {
    return this.AnimalRepository.update(id, animalData);
  }

  async deleteAnimal(id: string): Promise<void> {
    return this.AnimalRepository.delete(id);
  }
}

import { AnimalData, AnimalAttributes } from "../../models/animal.model";

export interface IAnimalService {
  getAllAnimals(
    limit: number,
    offset: number
  ): Promise<{
    data: AnimalAttributes[];
    total: number;
    totalPages: number;
    currentPage: number;
  }>;
  getAnimalById(id: string): Promise<AnimalAttributes | null>;
  createAnimal(animalData: AnimalData): Promise<AnimalAttributes>;
  updateAnimal(
    id: string,
    animalData: AnimalData
  ): Promise<AnimalAttributes | null>;
  deleteAnimal(id: string): Promise<void>;
}

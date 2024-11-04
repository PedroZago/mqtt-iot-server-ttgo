import { AnimalData, AnimalAttributes } from "../../models/animal.model";

export interface IAnimalService {
  getAllAnimals(limit: number, offset: number): Promise<AnimalAttributes[]>;
  getAnimalById(id: string): Promise<AnimalAttributes | null>;
  createAnimal(AnimalData: AnimalData): Promise<AnimalAttributes>;
  updateAnimal(
    id: string,
    AnimalData: AnimalData
  ): Promise<AnimalAttributes | null>;
  deleteAnimal(id: string): Promise<void>;
}

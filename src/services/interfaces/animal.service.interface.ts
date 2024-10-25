import { AnimalData, AnimalAttributes } from "../../models/animal.model";

export interface IAnimalService {
  getAllAnimals(): Promise<AnimalAttributes[]>;
  getAnimalById(id: number): Promise<AnimalAttributes | null>;
  createAnimal(AnimalData: AnimalData): Promise<AnimalAttributes>;
  updateAnimal(
    id: number,
    AnimalData: AnimalData
  ): Promise<AnimalAttributes | null>;
  deleteAnimal(id: number): Promise<void>;
}

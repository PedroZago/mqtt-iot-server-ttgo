import { AnimalData, AnimalAttributes } from "../../models/animal.model";

export interface IAnimalRepository {
  findAll(limit: number, offset: number): Promise<AnimalAttributes[]>;
  findById(id: string): Promise<AnimalAttributes | null>;
  create(animalData: AnimalData): Promise<AnimalAttributes>;
  update(id: string, animalData: AnimalData): Promise<AnimalAttributes | null>;
  delete(id: string): Promise<void>;
}

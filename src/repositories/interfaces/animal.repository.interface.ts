import { AnimalData, AnimalAttributes } from "../../models/animal.model";

export interface IAnimalRepository {
  findAll(limit: number, offset: number): Promise<AnimalAttributes[]>;
  findById(id: string): Promise<AnimalAttributes | null>;
  create(AnimalData: AnimalData): Promise<AnimalAttributes>;
  update(id: string, AnimalData: AnimalData): Promise<AnimalAttributes | null>;
  delete(id: string): Promise<void>;
}

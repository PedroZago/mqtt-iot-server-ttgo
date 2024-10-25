import { AnimalData, AnimalAttributes } from "../../models/animal.model";

export interface IAnimalRepository {
  findAll(): Promise<AnimalAttributes[]>;
  findById(id: number): Promise<AnimalAttributes | null>;
  create(AnimalData: AnimalData): Promise<AnimalAttributes>;
  update(id: number, AnimalData: AnimalData): Promise<AnimalAttributes | null>;
  delete(id: number): Promise<void>;
}

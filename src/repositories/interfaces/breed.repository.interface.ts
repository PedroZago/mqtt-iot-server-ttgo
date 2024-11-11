import { BreedData, BreedAttributes } from "../../models/breed.model";

export interface IBreedRepository {
  findAll(): Promise<BreedAttributes[]>;
  findById(id: string): Promise<BreedAttributes | null>;
  create(breedData: BreedData): Promise<BreedAttributes>;
  update(id: string, breedData: BreedData): Promise<BreedAttributes | null>;
  delete(id: string): Promise<void>;
}

import { BreedData, BreedAttributes } from "../../models/breed.model";

export interface IBreedService {
  getAllBreeds(): Promise<BreedAttributes[]>;
  getBreedById(id: string): Promise<BreedAttributes | null>;
  createBreed(breedData: BreedData): Promise<BreedAttributes>;
  updateBreed(
    id: string,
    breedData: BreedData
  ): Promise<BreedAttributes | null>;
  deleteBreed(id: string): Promise<void>;
}

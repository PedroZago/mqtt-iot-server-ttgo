import { SpecieData, SpecieAttributes } from "../../models/specie.model";

export interface ISpecieService {
  getAllSpecies(): Promise<SpecieAttributes[]>;
  getSpecieById(id: string): Promise<SpecieAttributes | null>;
  createSpecie(specieData: SpecieData): Promise<SpecieAttributes>;
  updateSpecie(
    id: string,
    specieData: SpecieData
  ): Promise<SpecieAttributes | null>;
  deleteSpecie(id: string): Promise<void>;
}

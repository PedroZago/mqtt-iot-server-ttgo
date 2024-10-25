import { SpecieData, SpecieAttributes } from "../../models/specie.model";

export interface ISpecieService {
  getAllSpecies(): Promise<SpecieAttributes[]>;
  getSpecieById(id: number): Promise<SpecieAttributes | null>;
  createSpecie(SpecieData: SpecieData): Promise<SpecieAttributes>;
  updateSpecie(
    id: number,
    SpecieData: SpecieData
  ): Promise<SpecieAttributes | null>;
  deleteSpecie(id: number): Promise<void>;
}

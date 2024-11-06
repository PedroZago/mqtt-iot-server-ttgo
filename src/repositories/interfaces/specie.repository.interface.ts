import { SpecieData, SpecieAttributes } from "../../models/specie.model";

export interface ISpecieRepository {
  findAll(): Promise<SpecieAttributes[]>;
  findById(id: string): Promise<SpecieAttributes | null>;
  create(specieData: SpecieData): Promise<SpecieAttributes>;
  update(id: string, specieData: SpecieData): Promise<SpecieAttributes | null>;
  delete(id: string): Promise<void>;
}

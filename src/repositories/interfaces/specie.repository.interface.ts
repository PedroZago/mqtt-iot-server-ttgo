import { SpecieData, SpecieAttributes } from "../../models/specie.model";

export interface ISpecieRepository {
  findAll(): Promise<SpecieAttributes[]>;
  findById(id: string): Promise<SpecieAttributes | null>;
  create(SpecieData: SpecieData): Promise<SpecieAttributes>;
  update(id: string, SpecieData: SpecieData): Promise<SpecieAttributes | null>;
  delete(id: string): Promise<void>;
}

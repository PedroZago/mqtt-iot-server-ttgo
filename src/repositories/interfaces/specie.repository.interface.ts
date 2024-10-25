import { SpecieData, SpecieAttributes } from "../../models/specie.model";

export interface ISpecieRepository {
  findAll(): Promise<SpecieAttributes[]>;
  findById(id: number): Promise<SpecieAttributes | null>;
  create(SpecieData: SpecieData): Promise<SpecieAttributes>;
  update(id: number, SpecieData: SpecieData): Promise<SpecieAttributes | null>;
  delete(id: number): Promise<void>;
}

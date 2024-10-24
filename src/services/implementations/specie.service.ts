import { SpecieRepository } from "../../repositories/implementations/specie.repository";
import { SpecieData, SpecieAttributes } from "../../models/specie.model";
import { ISpecieService } from "../interfaces/specie.service.interface";

export class SpecieService implements ISpecieService {
  private SpecieRepository: SpecieRepository;

  constructor(SpecieRepository: SpecieRepository) {
    this.SpecieRepository = SpecieRepository;
  }

  async getAllSpecies(): Promise<SpecieAttributes[]> {
    return this.SpecieRepository.findAll();
  }

  async getSpecieById(id: number): Promise<SpecieAttributes | null> {
    return this.SpecieRepository.findById(id);
  }

  async createSpecie(SpecieData: SpecieData): Promise<SpecieAttributes> {
    return this.SpecieRepository.create(SpecieData);
  }

  async updateSpecie(
    id: number,
    SpecieData: SpecieData
  ): Promise<SpecieAttributes | null> {
    return this.SpecieRepository.update(id, SpecieData);
  }

  async deleteSpecie(id: number): Promise<void> {
    return this.SpecieRepository.delete(id);
  }
}

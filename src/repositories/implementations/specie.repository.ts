import Specie, {
  SpecieData,
  SpecieAttributes,
} from "../../models/specie.model";
import { ISpecieRepository } from "../interfaces/specie.repository.interface";

export class SpecieRepository implements ISpecieRepository {
  async findAll(): Promise<SpecieAttributes[]> {
    return Specie.findAll();
  }

  async findById(id: string): Promise<SpecieAttributes | null> {
    return Specie.findByPk(id);
  }

  async create(specieData: SpecieData): Promise<SpecieAttributes> {
    return Specie.create(specieData);
  }

  async update(
    id: string,
    specieData: SpecieData
  ): Promise<SpecieAttributes | null> {
    const specie = await Specie.findByPk(id);
    if (specie) {
      return specie.update(specieData);
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    const specie = await Specie.findByPk(id);
    if (specie) {
      await specie.destroy();
    }
  }
}

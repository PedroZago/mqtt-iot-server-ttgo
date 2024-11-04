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

  async create(SpecieData: SpecieData): Promise<SpecieAttributes> {
    return Specie.create(SpecieData);
  }

  async update(
    id: string,
    SpecieData: SpecieData
  ): Promise<SpecieAttributes | null> {
    const specie = await Specie.findByPk(id);
    if (specie) {
      return specie.update(SpecieData);
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

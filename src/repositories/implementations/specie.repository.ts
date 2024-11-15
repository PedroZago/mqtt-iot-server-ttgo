import Specie, {
  SpecieData,
  SpecieAttributes,
} from "../../models/specie.model";
import { ISpecieRepository } from "../interfaces/specie.repository.interface";

export class SpecieRepository implements ISpecieRepository {
  async findAll(): Promise<SpecieAttributes[]> {
    return Specie.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });
  }

  async findById(id: string): Promise<SpecieAttributes | null> {
    return Specie.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });
  }

  async create(specieData: SpecieData): Promise<SpecieAttributes> {
    const specie = await Specie.create(specieData);
    return specie.get({ plain: true });
  }

  async update(
    id: string,
    specieData: SpecieData
  ): Promise<SpecieAttributes | null> {
    const specie = await Specie.findByPk(id);
    if (specie) {
      await specie.update(specieData);
      return specie.get({ plain: true });
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

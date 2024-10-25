import { Request, Response } from "express";
import { ISpecieService } from "../services/interfaces/specie.service.interface";
import { SpecieService } from "../services/implementations/specie.service";
import { SpecieRepository } from "../repositories/implementations/specie.repository";

export class SpecieController {
  private specieService: ISpecieService;

  constructor() {
    const specieRepository = new SpecieRepository();
    this.specieService = new SpecieService(specieRepository);
  }

  async getAllSpecies(_req: Request, res: Response): Promise<Response> {
    try {
      const species = await this.specieService.getAllSpecies();
      return res.status(200).json(species);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async getSpecieById(req: Request, res: Response): Promise<Response> {
    try {
      const specie = await this.specieService.getSpecieById(
        Number(req.params.id)
      );
      return res.status(200).json(specie);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async createSpecie(req: Request, res: Response): Promise<Response> {
    try {
      const newSpecie = await this.specieService.createSpecie(req.body);
      return res.status(201).json(newSpecie);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async updateSpecie(req: Request, res: Response): Promise<Response> {
    try {
      const updatedSpecie = await this.specieService.updateSpecie(
        Number(req.params.id),
        req.body
      );
      return res.status(200).json(updatedSpecie);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async deleteSpecie(req: Request, res: Response): Promise<Response> {
    try {
      await this.specieService.deleteSpecie(Number(req.params.id));
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}

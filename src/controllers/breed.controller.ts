import { Request, Response } from "express";
import { IBreedService } from "../services/interfaces/breed.service.interface";
import { BreedService } from "../services/implementations/breed.service";
import { BreedRepository } from "../repositories/implementations/breed.repository";

export class BreedController {
  private breedService: IBreedService;

  constructor() {
    const breedRepository = new BreedRepository();
    this.breedService = new BreedService(breedRepository);
  }

  async getAllBreeds(_req: Request, res: Response): Promise<Response> {
    try {
      const breeds = await this.breedService.getAllBreeds();
      return res.status(200).json(breeds);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async getBreedById(req: Request, res: Response): Promise<Response> {
    try {
      const breed = await this.breedService.getBreedById(req.params.id);
      return res.status(200).json(breed);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async createBreed(req: Request, res: Response): Promise<Response> {
    try {
      const newBreed = await this.breedService.createBreed(req.body);
      return res.status(201).json(newBreed);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async updateBreed(req: Request, res: Response): Promise<Response> {
    try {
      const updatedBreed = await this.breedService.updateBreed(
        req.params.id,
        req.body
      );
      return res.status(200).json(updatedBreed);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async deleteBreed(req: Request, res: Response): Promise<Response> {
    try {
      await this.breedService.deleteBreed(req.params.id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}

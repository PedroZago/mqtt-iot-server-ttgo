import { Request, Response } from "express";
import { IAnimalService } from "../services/interfaces/animal.service.interface";
import { AnimalService } from "../services/implementations/animal.service";
import { AnimalRepository } from "../repositories/implementations/animal.repository";

export class AnimalController {
  private animalService: IAnimalService;

  constructor() {
    const animalRepository = new AnimalRepository();
    this.animalService = new AnimalService(animalRepository);
  }

  async getAllAnimals(req: Request, res: Response): Promise<Response> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;

      const { data, total, totalPages, currentPage } =
        await this.animalService.getAllAnimals(limit, offset);
      return res.status(200).json({
        data,
        pagination: {
          total,
          totalPages,
          currentPage,
          limit,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async getAnimalById(req: Request, res: Response): Promise<Response> {
    try {
      const animal = await this.animalService.getAnimalById(req.params.id);
      return res.status(200).json(animal);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async createAnimal(req: Request, res: Response): Promise<Response> {
    try {
      const newAnimal = await this.animalService.createAnimal(req.body);
      return res.status(201).json(newAnimal);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async updateAnimal(req: Request, res: Response): Promise<Response> {
    try {
      const updatedAnimal = await this.animalService.updateAnimal(
        req.params.id,
        req.body
      );
      return res.status(200).json(updatedAnimal);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async deleteAnimal(req: Request, res: Response): Promise<Response> {
    try {
      await this.animalService.deleteAnimal(req.params.id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}

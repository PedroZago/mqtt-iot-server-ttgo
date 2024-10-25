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

  async getAllAnimals(_req: Request, res: Response): Promise<Response> {
    try {
      const animals = await this.animalService.getAllAnimals();
      return res.status(200).json(animals);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async getAnimalById(req: Request, res: Response): Promise<Response> {
    try {
      const animal = await this.animalService.getAnimalById(
        Number(req.params.id)
      );
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
        Number(req.params.id),
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
      await this.animalService.deleteAnimal(Number(req.params.id));
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}

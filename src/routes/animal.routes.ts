import { Router, Request, Response } from "express";
import { AnimalController } from "../controllers/animal.controller";

const router = Router();
const animalController = new AnimalController();

router.get("/", async (req: Request, res: Response) => {
  await animalController.getAllAnimals(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await animalController.getAnimalById(req, res);
});

router.post("/", async (req: Request, res: Response) => {
  await animalController.createAnimal(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
  await animalController.updateAnimal(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await animalController.deleteAnimal(req, res);
});

export default router;

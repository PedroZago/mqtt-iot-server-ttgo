import { Router, Request, Response } from "express";
import { SpecieController } from "../controllers/specie.controller";

const router = Router();
const specieController = new SpecieController();

router.get("/", async (req: Request, res: Response) => {
  await specieController.getAllSpecies(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await specieController.getSpecieById(req, res);
});

router.post("/", async (req: Request, res: Response) => {
  await specieController.createSpecie(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
  await specieController.updateSpecie(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await specieController.deleteSpecie(req, res);
});

export default router;

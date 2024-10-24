import express from "express";
import {
  createAnimal,
  deleteAnimalById,
  getAnimals,
  getAnimalById,
  updateAnimalById,
} from "../services/animal.service";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createAnimal);
router.get("/", authMiddleware, getAnimals);
router.get("/:id", authMiddleware, getAnimalById);
router.patch("/:id", authMiddleware, updateAnimalById);
router.delete("/:id", authMiddleware, deleteAnimalById);

export default router;

import express from "express";
import {
  createSpecie,
  deleteSpecieById,
  getSpecies,
  getSpecieById,
  updateSpecieById,
} from "../services/specie.service";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createSpecie);
router.get("/", authMiddleware, getSpecies);
router.get("/:id", authMiddleware, getSpecieById);
router.patch("/:id", authMiddleware, updateSpecieById);
router.delete("/:id", authMiddleware, deleteSpecieById);

export default router;

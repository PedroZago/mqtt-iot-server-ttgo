import express from "express";
import {
  createTelemetry,
  deleteTelemetryById,
  getTelemetries,
  getTelemetryById,
  updateTelemetryById,
} from "../services/telemetry.service";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createTelemetry);
router.get("/", authMiddleware, getTelemetries);
router.get("/:id", authMiddleware, getTelemetryById);
router.patch("/:id", authMiddleware, updateTelemetryById);
router.delete("/:id", authMiddleware, deleteTelemetryById);

export default router;

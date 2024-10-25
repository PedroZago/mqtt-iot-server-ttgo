import { Router, Request, Response } from "express";
import { TelemetryController } from "../controllers/telemetry.controller";

const router = Router();
const telemetryController = new TelemetryController();

router.get("/", async (req: Request, res: Response) => {
  await telemetryController.getAllTelemetries(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await telemetryController.getTelemetryById(req, res);
});

router.post("/", async (req: Request, res: Response) => {
  await telemetryController.createTelemetry(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
  await telemetryController.updateTelemetry(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await telemetryController.deleteTelemetry(req, res);
});

export default router;

import { Router, Request, Response } from "express";
import { DeviceController } from "../controllers/device.controller";

const router = Router();
const deviceController = new DeviceController();

router.get("/", async (req: Request, res: Response) => {
  await deviceController.getAllDevices(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await deviceController.getDeviceById(req, res);
});

router.post("/", async (req: Request, res: Response) => {
  await deviceController.createDevice(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
  await deviceController.updateDevice(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await deviceController.deleteDevice(req, res);
});

export default router;

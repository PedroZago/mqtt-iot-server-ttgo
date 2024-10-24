import express from "express";
import {
  createDevice,
  deleteDeviceById,
  getDevices,
  getDeviceById,
  updateDeviceById,
} from "../services/device.service";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createDevice);
router.get("/", authMiddleware, getDevices);
router.get("/:id", authMiddleware, getDeviceById);
router.patch("/:id", authMiddleware, updateDeviceById);
router.delete("/:id", authMiddleware, deleteDeviceById);

export default router;

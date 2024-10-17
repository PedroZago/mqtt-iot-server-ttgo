import express from "express";
import { getStatus } from "../controllers/iotController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// router.post("/", authMiddleware, createData);
router.post("/status", authMiddleware, getStatus);
// router.get("/", authMiddleware, getData);

export default router;

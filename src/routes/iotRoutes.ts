import express from "express";
import { createData } from "../controllers/iotController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createData);
// router.get("/", authMiddleware, getData);

export default router;

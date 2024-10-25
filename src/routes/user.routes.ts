import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.get("/", async (req: Request, res: Response) => {
  await userController.getAllUsers(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await userController.getUserById(req, res);
});

router.post("/", async (req: Request, res: Response) => {
  await userController.createUser(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
  await userController.updateUser(req, res);
});

router.patch("/update-password", async (req: Request, res: Response) => {
  await userController.updatePassword(req, res);
});

router.patch("/update-role", async (req: Request, res: Response) => {
  await userController.updateUserRole(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await userController.deleteUser(req, res);
});

export default router;

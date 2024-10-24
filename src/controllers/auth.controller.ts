import express from "express";
import {
  login,
  register,
  changeUserRole,
  logout,
  updatePassword,
} from "../services/user.service";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/change-role", changeUserRole);
router.post("/update-password", updatePassword);

export default router;

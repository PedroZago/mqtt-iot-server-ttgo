import { Request, Response } from "express";
import { User, IUser } from "../models/UserModel";
import jwt from "jsonwebtoken";
import { logger } from "../config/logger";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, email } = req.body as IUser;
    if (!username || !password || !email) {
      res
        .status(400)
        .json({ message: "Username, email and password are required." });
      return;
    }

    const user = new User({ username, password, email });
    await user.save();

    res.status(201).send({ message: "User created successfully." });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    logger.error(`Error creating user: ${errorMessage}`);
    res.status(400).send({ error: errorMessage });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as IUser;
    if (!password || !email) {
      res.status(400).json({ message: "Email and password are required." });
      return;
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).send({ error: "Invalid credentials" });
      return;
    }

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "",
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).send({ accessToken });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    logger.error(`Error logging user: ${errorMessage}`);
    res.status(400).send({ error: errorMessage });
  }
};

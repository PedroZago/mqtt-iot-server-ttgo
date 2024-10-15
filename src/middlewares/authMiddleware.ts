import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  // req: Request,
  req: any,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "") as string;

    req.user = verified;
    next();
  } catch {
    res.status(400).json({ error: "Invalid token" });
  }
};

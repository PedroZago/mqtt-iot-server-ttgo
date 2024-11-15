import { Request, Response } from "express";
import User, { UserCreationAttributes } from "../models/user.model";
import { logger } from "../config/logger";
import { UserRole } from "../enums/user-role.enum";
import jwt from "jsonwebtoken";

interface UserCreationAttributesWithConfirmPassword
  extends UserCreationAttributes {
  confirmPassword: string;
}

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, password, email, confirmPassword } =
    req.body as UserCreationAttributesWithConfirmPassword;

  if (!name || !password || !email || !confirmPassword) {
    res.status(400).json({ message: "Nome, e-mail e senha são obrigatórios." });
    return;
  }

  if (password !== confirmPassword) {
    res
      .status(400)
      .json({ message: "A confirmação de senha não corresponde." });
    return;
  }

  try {
    const user = await User.create({
      name,
      password,
      email,
      role: UserRole.USER,
    });

    res.status(201).send({ message: "Usuário criado com sucesso.", user });
  } catch (error) {
    logger.error(
      `Erro ao criar usuário: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao criar usuário." });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) {
    res.status(400).json({ message: "E-mail e senha são obrigatórios." });
    return;
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).send({ message: "Credenciais inválidas" });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).send({ message: "Credenciais inválidas" });
      return;
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "",
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      }
    );

    res.status(200).send({ accessToken, user });
  } catch (error) {
    logger.error(
      `Erro ao fazer login: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao fazer login." });
  }
};


export const logout = async (req: Request, res: Response): Promise<void> => {
  res.status(200).send({ message: "Desconectado com sucesso." });
};

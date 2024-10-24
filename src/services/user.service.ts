import { Request, Response } from "express";
import User, { UserCreationAttributes, UserRole } from "../models/UserModel";
import jwt from "jsonwebtoken";
import { logger } from "../config/logger";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, password, email } = req.body as UserCreationAttributes;

  if (!name || !password || !email) {
    res.status(400).json({ message: "Nome, e-mail e senha são obrigatórios." });
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
    if (!user || user.password !== password) {
      res.status(401).send({ message: "Credenciais inválidas" });
      return;
    }

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "",
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).send({ accessToken });
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

export const updatePassword = async (
  // req: Request,
  req: any,
  res: Response
): Promise<void> => {
  const { id } = req.user as { id: string };
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user || user.password !== oldPassword) {
      res.status(401).send({ message: "Credenciais inválidas" });
      return;
    }

    user.password = newPassword;
    await user.save();

    res.status(200).send({ message: "Senha atualizada com sucesso." });
  } catch (error) {
    logger.error(
      `Erro ao atualizar senha: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao atualizar senha." });
  }
};

export const changeUserRole = async (
  // req: Request,
  req: any,
  res: Response
): Promise<void> => {
  const { userId, newRole } = req.body as { userId: string; newRole: UserRole };
  const currentUser = req.user;

  if (currentUser.role !== UserRole.ADMIN) {
    res.status(403).send({ message: "Acesso negado." });
    return;
  }

  if (!Object.values(UserRole).includes(newRole)) {
    res.status(400).send({ message: "Função inválida." });
    return;
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).send({ message: "Usuário não encontrado." });
      return;
    }

    user.role = newRole;
    await user.save();

    res
      .status(200)
      .send({ message: "Função do usuário atualizada com sucesso." });
  } catch (error) {
    logger.error(
      `Erro ao mudar a função do usuário: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao mudar a função do usuário." });
  }
};

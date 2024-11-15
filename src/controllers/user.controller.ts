import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUserService } from "../services/interfaces/user.service.interface";
import { UserService } from "../services/implementations/user.service";
import { UserRepository } from "../repositories/implementations/user.repository";
import { UserAttributes } from "../models/user.model";

export class UserController {
  private userService: IUserService;

  constructor() {
    const userRepository = new UserRepository();
    this.userService = new UserService(userRepository);
  }

  async getAllUsers(_req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.getUserById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async getMe(req: Request, res: Response): Promise<Response> {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1];

      if (!accessToken) {
        return res.status(401).json({ message: "Token não fornecido." });
      }

      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_SECRET || ""
      ) as UserAttributes;

      const userId = decoded.id;

      const user = await this.userService.getUserById(userId);

      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: "Token inválido." });
      } else if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const newUser = await this.userService.createUser(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const updatedUser = await this.userService.updateUser(
        req.params.id,
        req.body
      );
      return res.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async updatePassword(req: Request, res: Response): Promise<Response> {
    try {
      await this.userService.updatePassword(
        // @ts-ignore
        req.user.id,
        req.body.oldPassword,
        req.body.newPassword
      );
      return res.status(200).send({ message: "Senha atualizada com sucesso." });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async updateUserRole(req: Request, res: Response): Promise<Response> {
    try {
      await this.userService.updateUserRole(
        req.body.id,
        // @ts-ignore
        req.user?.role,
        req.body.newRole
      );
      return res
        .status(200)
        .send({ message: "Função do usuário atualizada com sucesso." });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      await this.userService.deleteUser(req.params.id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}

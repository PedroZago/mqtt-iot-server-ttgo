import { UserRepository } from "../../repositories/implementations/user.repository";
import { UserData, UserAttributes } from "../../models/user.model";
import { IUserService } from "../interfaces/user.service.interface";
import { UserRole } from "../../enums/user-role.enum";

export class UserService implements IUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<UserAttributes[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<UserAttributes | null> {
    return this.userRepository.findById(id);
  }

  async createUser(userData: UserData): Promise<UserAttributes> {
    return this.userRepository.create(userData);
  }

  async updateUser(
    id: string,
    userData: UserData
  ): Promise<UserAttributes | null> {
    return this.userRepository.update(id, userData);
  }

  async updatePassword(
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user || user.password !== oldPassword) {
      throw new Error("Credenciais inválidas");
    }
    await this.userRepository.updatePassword(id, newPassword);
  }

  async updateUserRole(
    id: string,
    currentUserRole: UserRole,
    newRole: UserRole
  ): Promise<void> {
    if (currentUserRole !== UserRole.ADMIN) {
      throw new Error("Acesso negado");
    }

    if (!Object.values(UserRole).includes(newRole)) {
      throw new Error("Função inválida");
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await this.userRepository.updateUserRole(id, newRole);
  }

  async deleteUser(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}

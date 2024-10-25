import { UserRole } from "../../enums/user-role.enum";
import User, { UserData, UserAttributes } from "../../models/user.model";
import { IUserRepository } from "../interfaces/user.repository.interface";

export class UserRepository implements IUserRepository {
  async findAll(): Promise<UserAttributes[]> {
    return User.findAll();
  }

  async findById(id: number): Promise<UserAttributes | null> {
    return User.findByPk(id);
  }

  async create(userData: UserData): Promise<UserAttributes> {
    return User.create(userData);
  }

  async update(id: number, userData: UserData): Promise<UserAttributes | null> {
    const user = await User.findByPk(id);
    if (user) {
      return user.update(userData);
    }
    return null;
  }

  async updatePassword(id: number, newPassword: string): Promise<void> {
    const user = await User.findByPk(id);
    if (user) {
      user.password = newPassword;
      await user.save();
    }
  }

  async updateUserRole(id: number, newRole: UserRole): Promise<void> {
    const user = await User.findByPk(id);
    if (user) {
      user.role = newRole;
      await user.save();
    }
  }

  async delete(id: number): Promise<void> {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
    }
  }
}

import { UserRole } from "../../enums/user-role.enum";
import User, { UserData, UserAttributes } from "../../models/user.model";
import { IUserRepository } from "../interfaces/user.repository.interface";

export class UserRepository implements IUserRepository {
  async findAll(): Promise<UserAttributes[]> {
    return User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });
  }

  async findById(id: string): Promise<UserAttributes | null> {
    return User.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });
  }

  async create(userData: UserData): Promise<UserAttributes> {
    const user = await User.create(userData);
    return user.get({ plain: true });
  }

  async update(id: string, userData: UserData): Promise<UserAttributes | null> {
    const user = await User.findByPk(id);
    if (user) {
      await user.update(userData);
      return user.get({ plain: true });
    }
    return null;
  }

  async updatePassword(id: string, newPassword: string): Promise<void> {
    const user = await User.findByPk(id);
    if (user) {
      user.password = newPassword;
      await user.save();
    }
  }

  async updateUserRole(id: string, newRole: UserRole): Promise<void> {
    const user = await User.findByPk(id);
    if (user) {
      user.role = newRole;
      await user.save();
    }
  }

  async delete(id: string): Promise<void> {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
    }
  }
}

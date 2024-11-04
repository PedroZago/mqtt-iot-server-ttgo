import { UserRole } from "../../enums/user-role.enum";
import { UserData, UserAttributes } from "../../models/user.model";

export interface IUserRepository {
  findAll(): Promise<UserAttributes[]>;
  findById(id: string): Promise<UserAttributes | null>;
  create(userData: UserData): Promise<UserAttributes>;
  update(id: string, userData: UserData): Promise<UserAttributes | null>;
  updatePassword(id: string, newPassword: string): Promise<void>;
  updateUserRole(id: string, newRole: UserRole): Promise<void>;
  delete(id: string): Promise<void>;
}

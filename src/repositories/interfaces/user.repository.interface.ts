import { UserRole } from "../../enums/user-role.enum";
import { UserData, UserAttributes } from "../../models/user.model";

export interface IUserRepository {
  findAll(): Promise<UserAttributes[]>;
  findById(id: number): Promise<UserAttributes | null>;
  create(userData: UserData): Promise<UserAttributes>;
  update(id: number, userData: UserData): Promise<UserAttributes | null>;
  updatePassword(id: number, newPassword: string): Promise<void>;
  updateUserRole(id: number, newRole: UserRole): Promise<void>;
  delete(id: number): Promise<void>;
}

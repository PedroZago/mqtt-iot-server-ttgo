import { UserRole } from "../../enums/user-role.enum";
import { UserData, UserAttributes } from "../../models/user.model";

export interface IUserService {
  getAllUsers(): Promise<UserAttributes[]>;
  getUserById(id: string): Promise<UserAttributes | null>;
  createUser(userData: UserData): Promise<UserAttributes>;
  updateUser(id: string, userData: UserData): Promise<UserAttributes | null>;
  updatePassword(
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void>;
  updateUserRole(
    id: string,
    currentUserRole: UserRole,
    newRole: UserRole
  ): Promise<void>;
  deleteUser(id: string): Promise<void>;
}

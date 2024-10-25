import { UserRole } from "../../enums/user-role.enum";
import { UserData, UserAttributes } from "../../models/user.model";

export interface IUserService {
  getAllUsers(): Promise<UserAttributes[]>;
  getUserById(id: number): Promise<UserAttributes | null>;
  createUser(userData: UserData): Promise<UserAttributes>;
  updateUser(id: number, userData: UserData): Promise<UserAttributes | null>;
  updatePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Promise<void>;
  updateUserRole(
    id: number,
    currentUserRole: UserRole,
    newRole: UserRole
  ): Promise<void>;
  deleteUser(id: number): Promise<void>;
}

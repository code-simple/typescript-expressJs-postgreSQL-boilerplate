import { Role } from "../config/roles";

// Interface defining the attributes of the User
export interface UserAttributes {
  id: number;
  role: Role; // 0: admin, 1: user, 2: other
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string; // Virtual attribute, not stored in DB
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  token?: string | null;
  isEmailVerified?: boolean;
}

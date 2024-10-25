export interface UserAttributes {
  id: number;
  userType: "0" | "1" | "2";
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  confirmPassword: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  token?: string | null;
}

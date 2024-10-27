// src/types/token.ts

export interface TokenAttributes {
  id: number;
  token: string;
  userId: number;
  type: "verifyEmail" | "resetPassword" | "refresh" | "access" | string;
  expires: Date;
  blacklisted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

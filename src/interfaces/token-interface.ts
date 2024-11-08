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

export interface Payload {
  sub: number; // User ID
  email: string; // User email
  fullName: string; // User's full name
  role: string; // User role
  iat: number; // Issued at time
  exp: number; // Expiry time
  type: string; // Token type
}

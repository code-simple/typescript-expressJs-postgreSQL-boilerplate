export const tokenTypes = {
  ACCESS: "access",
  REFRESH: "refresh",
  RESET_PASSWORD: "resetPassword",
  VERIFY_EMAIL: "verifyEmail",
} as const;

// Optionally, you can export a type to restrict allowed values
export type TokenType = (typeof tokenTypes)[keyof typeof tokenTypes];

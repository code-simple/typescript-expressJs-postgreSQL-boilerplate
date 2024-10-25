import jwt from "jsonwebtoken";

const generateToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
export { generateToken };

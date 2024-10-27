import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import User from "../models/User";
import { ENV } from "./config";

// Interface for Payload (adjust fields based on your token structure)
interface Payload {
  sub: number; // User ID
  email: string; // User email
  fullName: string; // User's full name
  role: string; // User role
  iat: number; // Issued at time
  exp: number; // Expiry time
  type: string; // Token type
}

// Options for the JWT strategy
const jwtOptions: StrategyOptions = {
  secretOrKey: ENV.JWT.SECRET_KEY!,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// JWT Verify function with async handling and proper types
const jwtVerify = async (
  payload: Payload,
  done: (error: any, user?: any) => void
) => {
  try {
    // Use payload.sub as it contains the user's ID
    const user = await User.findByPk(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

// Initialize the JWT strategy with options and verify callback
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export { jwtStrategy };

// src/config/passport.ts

import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();
// Interface for Payload (adjust fields based on your token structure)
interface Payload {
  id: number;
}

// Options for the JWT strategy
const jwtOptions: StrategyOptions = {
  secretOrKey: process.env.JWT_SECRET_KEY!,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// JWT Verify function with async handling and proper types
const jwtVerify = async (
  payload: Payload,
  done: (error: any, user?: any) => void
) => {
  try {
    // Adjust the User model method if you use a different method to find users
    const user = await User.findByPk(payload.id);
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

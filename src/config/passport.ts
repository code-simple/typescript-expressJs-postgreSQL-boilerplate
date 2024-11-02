import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import User from "../models/User";
import Token from "../models/Token"; // Import the Token model
import { ENV } from "./config";
import { Payload } from "../interfaces/Token";

// JWT strategy options
const jwtOptions: StrategyOptions = {
  secretOrKey: ENV.JWT.SECRET_KEY!,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// Verify function to check both user and token validity
const jwtVerify = async (
  payload: Payload,
  done: (error: any, user?: any) => void
) => {
  try {
    // Find the user by ID from the payload
    const user = await User.findByPk(payload.sub);
    if (!user) {
      return done(null, false);
    }

    // Check if the token exists and is still valid
    const tokenExists = await Token.findOne({
      where: {
        userId: payload.sub,
      },
    });

    if (!tokenExists) {
      return done(null, false); // If the token is not valid, reject access
    }

    // If both user and token are valid, proceed
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

// Initialize JWT strategy with options and verify callback
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export { jwtStrategy };

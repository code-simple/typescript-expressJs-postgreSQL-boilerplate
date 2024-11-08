import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  // NOTE: There is loophole if skipSuccessfulRequests is set true then there can be an attack by creating multiple accounts.
  skipSuccessfulRequests: false, // Skip successful requests
});

export { authLimiter };

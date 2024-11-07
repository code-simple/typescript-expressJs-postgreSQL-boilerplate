import { Request, Response, NextFunction } from "express";
import sanitizeHtml from "sanitize-html";

// Middleware function for sanitizing all string values in req.body
const sanitizeRequest = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = sanitizeHtml(req.body[key], {
          allowedTags: [], // Add tags here if you want to allow specific HTML tags
          allowedAttributes: {}, // Add attributes here if you want to allow specific HTML attributes
        });
      }
    }
  }
  next();
};

export default sanitizeRequest;

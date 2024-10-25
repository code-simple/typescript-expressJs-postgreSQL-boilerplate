import { User } from "./path/to/your/UserModel"; // Adjust the path to your User model

declare global {
  namespace Express {
    interface Request {
      user?: User; // Replace `User` with the actual type of your user object
    }
  }
}

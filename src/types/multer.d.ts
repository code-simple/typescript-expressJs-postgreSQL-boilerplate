// types/multer.d.ts (ensure this file is in your TypeScript compilation context)
import multer from "multer";

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        key?: string; // Add the key property
      }
    }
  }
}

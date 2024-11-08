import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { Request } from "express";
import { ENV } from "../config/config"; // Ensure this points to your config
import logger from "../config/logger";

// Initialize S3 client
const s3 = new S3Client({
  region: ENV.S3.REGION,
  credentials: {
    accessKeyId: ENV.S3.ACCESS_KEY_ID as string,
    secretAccessKey: ENV.S3.SECRET_ACCESS_KEY as string,
  },
});

// Define the S3 bucket name
const bucketName = ENV.S3.BUCKET_NAME as string;

// Configure Multer S3 storage
const storage = multerS3({
  s3,
  bucket: bucketName,
  acl: "public-read", // Set your desired ACL policy
  contentType: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: any, mimeType: string) => void
  ) => {
    cb(null, file.mimetype); // Return the MIME type of the uploaded file
  },
  key: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: any, key: string) => void
  ) => {
    // Create a unique key for the file in the S3 bucket
    const fileKey = `${Date.now().toString()}-${file.originalname}`;
    logger.info(fileKey);
    cb(null, fileKey); // Pass the key to the callback
  },
});

// Middleware for single file upload
const addSingleMediaMiddleware = multer({ storage }).single("file");

// Middleware for multiple files upload
const addMultipleMediaMiddleware = multer({ storage }).array("files", 10); // Maximum of 10 files

// Export the middlewares for use in your routes
export { addSingleMediaMiddleware, addMultipleMediaMiddleware, s3 };

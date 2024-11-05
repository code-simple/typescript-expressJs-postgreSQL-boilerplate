import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { ENV } from "../config/config";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../services/s3Service";
import { message } from "../utils/message";

// Add Media Function
const addMedia = async (req: Request, res: Response) => {
  if (req.file) {
    const fileUrl = `https://${ENV.S3.BUCKET_NAME}.s3.amazonaws.com/${req.file.key}`;
    res.status(httpStatus.CREATED).json(fileUrl);
  } else {
    res.status(400).send("No file uploaded.");
  }
};

// Add Multiple Media Function
const addMultipleMedia = async (req: Request, res: Response) => {
  if (req.files && Array.isArray(req.files)) {
    const fileUrls = req.files.map((file: Express.Multer.File) => {
      return `https://${ENV.S3.BUCKET_NAME}.s3.amazonaws.com/${file.key}`;
    });
    res.status(httpStatus.CREATED).json(fileUrls);
  } else {
    res.status(400).send("No files uploaded.");
  }
};

const deleteMedia = async (req: Request, res: Response) => {
  const { fileKey } = req.params; // Expecting the key in the request body

  if (!fileKey) {
    return res.status(httpStatus.BAD_REQUEST).send(message.S3.FILEKEY_REQUIRED);
  }

  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: ENV.S3.BUCKET_NAME,
      Key: fileKey,
    });

    await s3.send(deleteCommand);
    res.status(httpStatus.OK).send(message.S3.DELETED);
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(message.S3.DELETE_ERROR);
  }
};

export { addMedia, addMultipleMedia, deleteMedia };

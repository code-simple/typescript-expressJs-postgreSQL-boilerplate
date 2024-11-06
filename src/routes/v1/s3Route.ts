import express from "express";
import * as s3Service from "../../services/s3Service";
import * as s3Controller from "../../controllers/s3Controller";
import catchAsync from "../../utils/catchAsync";
import auth from "../../middlewares/auth";

const router = express.Router();

router.use(auth());

// Query key "file" for single media
router.post(
  "/addFile",
  s3Service.addSingleMediaMiddleware,
  catchAsync(s3Controller.addMedia)
);

// Query key "files" for multiple files
router.post(
  "/addFiles",
  s3Service.addMultipleMediaMiddleware,
  catchAsync(s3Controller.addMultipleMedia)
);

router.delete("/deleteFile/:fileKey", catchAsync(s3Controller.deleteMedia)); // Endpoint for updating a media file

export default router;

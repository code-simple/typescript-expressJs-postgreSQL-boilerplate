import express from "express";
import {
  addSingleMediaMiddleware,
  addMultipleMediaMiddleware,
} from "../../services/s3Service";
import {
  addMedia,
  addMultipleMedia,
  deleteMedia,
} from "../../controllers/s3Controller";
import catchAsync from "../../utils/catchAsync";
import auth from "../../middlewares/auth";

const router = express.Router();

router.use(auth());

// Query key "file" for single media
router.post("/addMedia", addSingleMediaMiddleware, catchAsync(addMedia));

// Query key "files" for multiple files
router.post(
  "/addMediaFiles",
  addMultipleMediaMiddleware,
  catchAsync(addMultipleMedia)
);

router.delete("/deleteMedia/:fileKey", catchAsync(deleteMedia)); // Endpoint for updating a media file

export default router;

import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import {
  uploadFileController
} from "../controllers/uploadController2.js";

const router = express.Router();

router.post(
  "/upload",
  upload.single("file"),
  uploadFileController
);

export default router;
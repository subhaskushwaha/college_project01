import express from "express";
const router = express.Router();

import { uploadLeads, getUploads } from "../controllers/uploadController.js";

router.post("/upload", uploadLeads);
router.get("/uploads", getUploads);

export default router;
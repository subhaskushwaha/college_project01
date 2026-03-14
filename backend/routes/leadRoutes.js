import express from "express";
import multer from "multer";
import { mergedLeadController, getLeadsController } from "../controllers/leadController.js";
import { adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Single API for both upload + assign
router.post("/lead-operation", adminOnly, upload.single("file"), mergedLeadController);
router.get("/", getLeadsController);

export default router; 

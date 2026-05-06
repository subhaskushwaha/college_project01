// routes/leadRoutes.js
import express from "express";
import multer from "multer";
import { uploadLeads, getLeads } from "../controllers/uploadController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; // also add .js if using ES modules

const router = express.Router();

const upload = multer({ dest: "uploads/" });

// ✅ Use correct middleware name
router.post("/upload", authMiddleware, upload.single("file"), uploadLeads);
router.get("/getUpload", authMiddleware, getLeads);

export default router;
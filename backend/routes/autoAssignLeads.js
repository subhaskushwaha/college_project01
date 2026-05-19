// routes/allotmentRoutes.js

import express from "express";

import { assignLeads } from "../controllers/allotmentController.js";

import {
  authMiddleware,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// =====================================
// AUTO ASSIGN LEADS
// =====================================
router.post(
  "/auto-assign",
  authMiddleware,
  adminOnly,
  assignLeads
);

export default router;
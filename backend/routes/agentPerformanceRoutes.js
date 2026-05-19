import express from "express";

import {
  getAssignedLeads,
  logCall,
  getPerformance,
} from "../controllers/agentPerformanceControllers.js";

import {
  authMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================
// GET ASSIGNED LEADS
// ======================================
router.get(
  "/my-leads",
  authMiddleware,
  getAssignedLeads
);

// ======================================
// LOG CALL
// ======================================
router.post(
  "/log-call",
  authMiddleware,
  logCall
);

// ======================================
// GET PERFORMANCE
// ======================================
router.get(
  "/my-performance",
  authMiddleware,
  getPerformance
);

export default router;
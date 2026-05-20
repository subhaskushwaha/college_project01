import express from "express";
import {
  getDashboardStats,
} from "../controllers/analyticsController.js";

import {
  getDashboardStatus,
} from "../controllers/analyticsController2.js";

import {
  authMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// GET DASHBOARD STATS
router.get(
  "/dashboard-stats",
  authMiddleware,
  getDashboardStats
);

// GET AGENT DASHBOARD STATUS
router.get(
  "/dashboard-status",
  authMiddleware,
  getDashboardStatus
);

export default router;
// routes/allotmentRoutes.js
import express from "express";
import { autoAssignLeads } from "../controllers/allotmentController.js";

const router = express.Router();

router.post("/auto-assign", autoAssignLeads);

export default router;
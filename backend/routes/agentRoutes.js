import express from "express";
import { listAgentLeads, modifyLead } from "../controllers/agentController.js";
// import { verifyToken } from "../middlewares/authMiddleware.js"; // optional if JWT used

const router = express.Router();

router.get("/leads", listAgentLeads);

router.put("/leads/:id", modifyLead);

export default router;

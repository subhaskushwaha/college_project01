import express from "express";
import { listAgents, addAgent, updateAgent, removeAgent } from "../controllers/adminController.js";
import { authMiddleware, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware, adminOnly);

router.get("/agents", listAgents);
router.post("/agents", addAgent);
router.put("/agents/:id", updateAgent);
router.delete("/agents/:id", removeAgent);

export default router;
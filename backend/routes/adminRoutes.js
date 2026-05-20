const express = require("express");
const { listAgents, addAgent, updateAgent, removeAgent } = require("../controllers/adminController");
const { getDashboardStats } = require("../controllers/analyticsController");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authMiddleware, adminOnly);

router.get("/getAgents", listAgents);
router.post("/createAgents", addAgent);
router.put("/agents/:id", updateAgent); 
router.delete("/agents/:id", removeAgent);
router.get("/dashboard-stats",  getDashboardStats);

module.exports = router;
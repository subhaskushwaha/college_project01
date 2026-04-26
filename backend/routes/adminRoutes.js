const express = require("express");
const { listAgents, addAgent, updateAgent, removeAgent } = require("../controllers/adminController");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authMiddleware, adminOnly);

router.get("/agents", listAgents);
router.post("/agents", addAgent);
router.put("/agents/:id", updateAgent); 
router.delete("/agents/:id", removeAgent);

module.exports = router;
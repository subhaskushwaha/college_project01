// controllers/allotmentController.js
import { assignLeadsService } from "../services/allotmentService.js";

export const autoAssignLeads = async (req, res) => {
  try {
    const { strategy, adminName } = req.body;

    const total = await assignLeadsService(strategy, adminName);

    return res.status(200).json({
      message: "Leads assigned successfully",
      total_assigned: total,
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
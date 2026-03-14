// controllers/leadController.js
import { handleLeadOperations } from "../services/leadService.js";

export const mergedLeadController = async (req, res) => {
  try {
    const { action, leadId, agentId } = req.body;

    if (!action) throw new Error("Action is required (upload | assign)");

    let result;

    if (action === "upload") {
      if (!req.file) throw new Error("CSV file is required for upload");

      result = await handleLeadOperations({
        action: "upload",
        filePath: req.file.path,
      });
    }

    if (action === "assign") {
      if (!leadId || !agentId)
        throw new Error("leadId and agentId are required for assignment");

      result = await handleLeadOperations({
        action: "assign",
        leadId,
        agentId,
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: result.message,
    });
  } catch (error) {
    console.error("Merged Lead Error:", error.message);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};


export const getLeadsController = async (req, res) => {
  try {
    const leads = await getLeads();
    res.status(200).json({ success: true, statusCode: 200, data: leads });
  } catch (error) {
    console.error("Get Leads Error:", error.message);
    res.status(500).json({ success: false, statusCode: 500, message: error.message });
  }
};

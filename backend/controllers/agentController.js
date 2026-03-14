import { getLeadsByAgent, updateLeadById } from "../services/agentService.js";

export const listAgentLeads = async (req, res) => {
  try {
    const agent_id = req.user?.id || req.query.agent_id; // support Postman testing

    if (!agent_id) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Agent ID is required",
      });
    }

    const leads = await getLeadsByAgent(agent_id);

    if (!leads.length) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "No leads found for this agent",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Leads fetched successfully",
      total: leads.length,
      data: leads,
    });
  } catch (err) {
    console.error("Error in listAgentLeads:", err);
    res.status(err.statusCode || 500).json({
      success: false,
      statusCode: err.statusCode || 500,
      message: err.message || "Internal server error",
    });
  }
};

export const modifyLead = async (req, res) => {
  try {
    const agent_id = req.user?.id || req.body.agent_id;
    const lead_id = req.params.id;
    const { status, remarks, followUpDate } = req.body;

    if (!agent_id || !lead_id) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Agent ID and Lead ID are required",
      });
    }

    const updatedLead = await updateLeadById(lead_id, { status, remarks, followUpDate }, agent_id);

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Lead not found or not assigned to this agent",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Lead updated successfully",
      data: updatedLead,
    });
  } catch (err) {
    console.error("Error in modifyLead:", err);
    res.status(err.statusCode || 500).json({
      success: false,
      statusCode: err.statusCode || 500,
      message: err.message || "Internal server error",
    });
  }
};

import {  getAllAgents, createAgent, updateAgentService, deleteAgent } from "../services/adminService.js";


export const listAgents = async (req, res) => {
  try {
    const agents = await getAllAgents();
    res.status(200).json({ success: true, statusCode: 200, data: agents });
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const addAgent = async (req, res) => {
  try {
    const agentId = await createAgent(req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Agent created successfully",
      agent_id: agentId
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message
    });
  }
};

export const updateAgent = async (req, res) => {
  try {
    const updatedId = await updateAgentService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Agent updated successfully",
      agent_id: updatedId
    });

  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message
    });
  }
};

export const removeAgent = async (req, res) => {
  try {
    const deletedRows = await deleteAgent(req.params.id);
    res.status(200).json({ success: true, statusCode: 200, message: "Agent deleted successfully", deletedRows });
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

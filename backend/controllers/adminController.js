// controllers/adminController.js
import {
  getAllAgents,
  createAgent,
  updateAgentService,
  deleteAgent,
} from "../services/adminService.js";

// ===============================
// GET ALL AGENTS
// ===============================
export const listAgents = async (
  req,
  res
) => {
  try {

    const agents =
      await getAllAgents(req.user.id);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: agents,
    });

  } catch (err) {

    return res
      .status(err.statusCode || 500)
      .json({
        success: false,
        message: err.message,
      });
  }
};

// ===============================
// CREATE AGENT
// ===============================
export const addAgent = async (
  req,
  res
) => {
  try {

    const agentId =
      await createAgent(
        req.body,
        req.user.id
      );

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message:
        "Agent created successfully",
      agent_id: agentId,
    });

  } catch (err) {

    return res
      .status(err.statusCode || 500)
      .json({
        success: false,
        message: err.message,
      });
  }
};

export const updateAgent = async (
  req,
  res
) => {
  try {

    const updatedId =
      await updateAgentService(
        req.params.id,
        req.body,
        req.user.id
      );

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message:
        "Agent updated successfully",
      agent_id: updatedId,
    });

  } catch (err) {

    return res
      .status(err.statusCode || 500)
      .json({
        success: false,
        message: err.message,
      });
  }
};

export const removeAgent = async (
  req,
  res
) => {
  try {

    const deletedId =
      await deleteAgent(
        req.params.id,
        req.user.id
      );

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message:
        "Agent deleted successfully",
      deleted_id: deletedId,
    });

  } catch (err) {

    return res
      .status(err.statusCode || 500)
      .json({
        success: false,
        message: err.message,
      });
  }
};
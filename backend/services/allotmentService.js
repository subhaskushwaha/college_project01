import User from "../models/userModel.js";
import Customer from "../models/customerModel.js";
import DataAllotmentLog from "../models/allotmentLogModel.js";

export const autoAssignLeads = async (
  strategy,
  adminId
) => {

  // =====================================
  // GET ACTIVE AGENTS CREATED BY ADMIN
  // =====================================
  const agents = await User.find({
    role: "agent",
    createdBy: adminId,
    status: "active",
  });

  if (!agents.length) {

    const error = new Error(
      "No active agents found"
    );

    error.statusCode = 404;

    throw error;
  }

  // =====================================
  // GET UNASSIGNED LEADS
  // =====================================
  const unassignedLeads = await Customer.find({
    assigned_agent_id: null,
  });

  if (!unassignedLeads.length) {

    const error = new Error(
      "No unassigned leads found"
    );

    error.statusCode = 404;

    throw error;
  }

  // =====================================
  // ROUND ROBIN
  // =====================================
  if (strategy === "round_robin") {

    for (
      let i = 0;
      i < unassignedLeads.length;
      i++
    ) {

      const selectedAgent =
        agents[i % agents.length];

      await Customer.findByIdAndUpdate(
        unassignedLeads[i]._id,
        {
          assigned_agent_id:
            selectedAgent._id,
        }
      );
    }
  }

  // =====================================
  // PERFORMANCE BASED
  // =====================================
  else if (
    strategy === "performance_based"
  ) {

    agents.sort(
      (a, b) =>
        (b.conversion_rate || 0) -
        (a.conversion_rate || 0)
    );

    for (
      let i = 0;
      i < unassignedLeads.length;
      i++
    ) {

      const selectedAgent =
        agents[i % agents.length];

      await Customer.findByIdAndUpdate(
        unassignedLeads[i]._id,
        {
          assigned_agent_id:
            selectedAgent._id,
        }
      );
    }
  }

  // =====================================
  // WORKLOAD BALANCED
  // =====================================
  else if (
    strategy === "workload_balanced"
  ) {

    for (const lead of unassignedLeads) {

      const workloadData =
        await Promise.all(

          agents.map(async (agent) => {

            const totalAssigned =
              await Customer.countDocuments({
                assigned_agent_id:
                  agent._id,
              });

            return {
              agent,
              totalAssigned,
            };
          })
        );

      // FEWEST LEADS FIRST
      workloadData.sort(
        (a, b) =>
          a.totalAssigned -
          b.totalAssigned
      );

      const selectedAgent =
        workloadData[0].agent;

      await Customer.findByIdAndUpdate(
        lead._id,
        {
          assigned_agent_id:
            selectedAgent._id,
        }
      );
    }
  }

  // =====================================
  // INVALID STRATEGY
  // =====================================
  else {

    const error = new Error(
      "Invalid strategy"
    );

    error.statusCode = 400;

    throw error;
  }

  // =====================================
  // SAVE LOG
  // =====================================
  await DataAllotmentLog.create({

    strategy,

    total_leads:
      unassignedLeads.length,

    agents_involved:
      agents.map(
        (agent) => agent._id
      ),

    allotted_by: adminId,
  });

  // =====================================
  // RETURN RESPONSE
  // =====================================
  return {

    strategy,

    total_leads:
      unassignedLeads.length,

    total_agents:
      agents.length,
  };
};
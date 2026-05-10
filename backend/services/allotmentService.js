// services/allotmentService.js

import Customer from "../models/customerModel.js";
import Agent from "../models/agentModel.js";
import AllotmentLog from "../models/allotmentLogModel.js";

export const assignLeadsService = async (strategy, adminName) => {

  const leads = await Customer.find({ assigned_agent_id: null });
  const agents = await Agent.find();

  if (!leads.length) throw new Error("No unassigned leads");
  if (!agents.length) throw new Error("No agents found");

  let assignments = [];

  // 🔵 ROUND ROBIN
  if (strategy === "round_robin") {
    let index = 0;

    for (let lead of leads) {
      const agent = agents[index % agents.length];
      assignments.push({ leadId: lead._id, agentId: agent._id });
      index++;
    }
  }

  // 🟢 PERFORMANCE BASED
  else if (strategy === "performance_based") {
    const sortedAgents = agents.sort(
      (a, b) => b.conversion_rate - a.conversion_rate
    );

    let index = 0;

    for (let lead of leads) {
      const agent = sortedAgents[index % sortedAgents.length];
      assignments.push({ leadId: lead._id, agentId: agent._id });
      index++;
    }
  }

  // 🟡 WORKLOAD BALANCED
  else if (strategy === "workload_balanced") {

    const workload = await Customer.aggregate([
      { $match: { assigned_agent_id: { $ne: null } } },
      { $group: { _id: "$assigned_agent_id", total: { $sum: 1 } } }
    ]);

    let loadMap = {};
    agents.forEach(a => loadMap[a._id] = 0);

    workload.forEach(w => {
      loadMap[w._id] = w.total;
    });

    for (let lead of leads) {
      let leastAgent = agents.reduce((prev, curr) => {
        return loadMap[prev._id] < loadMap[curr._id] ? prev : curr;
      });

      assignments.push({ leadId: lead._id, agentId: leastAgent._id });

      loadMap[leastAgent._id]++;
    }
  }

  else {
    throw new Error("Invalid strategy");
  }

  // ✅ BULK UPDATE (FAST)
  const bulkOps = assignments.map(a => ({
    updateOne: {
      filter: { _id: a.leadId },
      update: { assigned_agent_id: a.agentId }
    }
  }));

  await Customer.bulkWrite(bulkOps);

  // ✅ LOG SAVE
  await AllotmentLog.create({
    strategy,
    total_leads: leads.length,
    agents_involved: agents.length,
    allotted_by: adminName || "admin",
  });

  return leads.length;
};
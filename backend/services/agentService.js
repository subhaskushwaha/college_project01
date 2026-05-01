import Lead from "../models/leadModel.js";


// ✅ GET LEADS BY AGENT
export const getLeadsByAgent = async (agent_id) => {
  try {
    const leads = await Lead.find({ agent_id })
      .select("-__v")
      .sort({ createdAt: -1 });

    return leads;
  } catch (error) {
    console.error("Error in getLeadsByAgent:", error);
    const err = new Error("Failed to fetch leads");
    err.statusCode = 500;
    throw err;
  }
};


// ✅ UPDATE LEAD
export const updateLeadById = async (lead_id, updateData, agent_id) => {
  try {
    const { status, remarks, followUpDate } = updateData;

    // check if lead belongs to agent
    const lead = await Lead.findOne({
      _id: lead_id,
      agent_id: agent_id,
    });

    if (!lead) {
      return null;
    }

    // update fields only if provided
    if (status) lead.status = status;
    if (remarks) lead.remarks = remarks;
    if (followUpDate) lead.follow_up_date = followUpDate;

    await lead.save();

    return lead;
  } catch (error) {
    console.error("Error in updateLeadById:", error);
    const err = new Error("Failed to update lead");
    err.statusCode = 500;
    throw err;
  }
};
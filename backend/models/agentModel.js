import db from "../config/db.js";

const Lead = {
  findByAgentId: async (agentId) => {
    const [rows] = await db.execute("SELECT * FROM leads WHERE agent_id = ?", [agentId]);
    return rows;
  },

  updateLead: async (leadId, data, agentId) => {
    const { status, remarks, followUpDate } = data;
    const [result] = await db.execute(
      "UPDATE leads SET status = ?, remarks = ?, follow_up_date = ? WHERE id = ? AND agent_id = ?",
      [status, remarks, followUpDate, leadId, agentId]
    );
    return result.affectedRows;
  },
};

export default Lead;

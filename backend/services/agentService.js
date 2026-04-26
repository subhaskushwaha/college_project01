import db from "../config/db.js";

export const getLeadsByAgent = async (agent_id) => {
  try {
    const [rows] = await db.query(
      "SELECT id, customer_name, contact_number, status, remarks, follow_up_date FROM leads WHERE agent_id = ?",
      [agent_id]
    );
    return rows;
  } catch (error) {
    console.error("Database error in getLeadsByAgent:", error);
    const err = new Error("Failed to fetch leads");
    err.statusCode = 500;
    throw err;
  }
};

export const updateLeadById = async (lead_id, updateData, agent_id) => {
  try {
    const { status, remarks, followUpDate } = updateData;

    const [existing] = await db.query("SELECT * FROM leads WHERE id = ? AND agent_id = ?", [
      lead_id,
      agent_id,
    ]);

    if (!existing.length) {
      return null;
    }

    await db.query(
      `UPDATE leads 
       SET status = COALESCE(?, status),
           remarks = COALESCE(?, remarks),
           follow_up_date = COALESCE(?, follow_up_date),
           updated_at = NOW()
       WHERE id = ? AND agent_id = ?`,
      [status, remarks, followUpDate, lead_id, agent_id]
    );

    const [updated] = await db.query("SELECT * FROM leads WHERE id = ?", [lead_id]);
    return updated[0];
  } catch (error) {
    console.error("Database error in updateLeadById:", error);
    const err = new Error("Failed to update lead");
    err.statusCode = 500;
    throw err;
  }
};

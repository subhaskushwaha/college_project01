// models/leadModel.js
import db from "../config/db.js";

const Lead = {
  bulkInsert: async (leadsArray) => {
    if (!Array.isArray(leadsArray) || leadsArray.length === 0) return 0;
    try {
      const values = leadsArray.map(l => [
        l.name || null,
        l.email || null,
        l.phone || null,
        l.lead_source || null,
        l.assigned_to || null
      ]);

      const sql = `INSERT INTO leads (name, email, phone, lead_source, assigned_to) VALUES ?`;
      const [result] = await db.query(sql, [values]);
      return result.affectedRows;
    } catch (err) {
      console.error("Database Error (Lead.bulkInsert):", err);
      throw new Error("Failed to insert leads");
    }
  },

  getAllLeads: async () => {
    try {
      const [rows] = await db.query("SELECT * FROM leads ORDER BY created_at DESC");
      return rows;
    } catch (err) {
      console.error("Database Error (Lead.getAllLeads):", err);
      throw new Error("Failed to fetch leads");
    }
  }
};

export default Lead;

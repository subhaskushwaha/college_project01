import db from "../config/db.js";

const Lead = {
  bulkInsert: async (leadsArray) => {
    const sql = `INSERT INTO leads (name, phone, email, status) VALUES ?`;
    const values = leadsArray.map(lead => [lead.name, lead.phone, lead.email, lead.status || 'Not Called']);
    const [result] = await db.query(sql, [values]);
    return result.affectedRows;
  },

  assignLead: async (leadId, agentId) => {
    const sql = `UPDATE leads SET assigned_to = ? WHERE id = ?`;
    const [result] = await db.query(sql, [agentId, leadId]);
    return result.affectedRows;
  },

  getAllLeads: async () => {
    const sql = `SELECT * FROM leads`;
    const [rows] = await db.query(sql);
    return rows;
  }
};

export default Lead;
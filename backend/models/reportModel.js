import db from "../config/db.js";

export const getLeadSummary = async () => {
  const [rows] = await db.query(`
    SELECT 
      COUNT(*) AS total_leads,
      SUM(status = 'Converted') AS converted,
      SUM(status = 'Pending') AS pending,
      SUM(status = 'Follow-Up') AS follow_up
    FROM leads
  `);
  return rows[0];
};

export const getAllLeads = async () => {
  const [rows] = await db.query(`
    SELECT id, customer_name, phone, status, remarks, follow_up_date, created_at 
    FROM leads ORDER BY created_at DESC
  `);
  return rows;
};

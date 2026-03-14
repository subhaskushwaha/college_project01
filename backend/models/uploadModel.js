import db from "../config/db.js";

const Lead = {
  create: async ({ lead_source, assigned_to, file_name, file_type, file_data, file_url }) => {
    try {
      const sql = `
        INSERT INTO leads2 
        (lead_source, assigned_to, file_name, file_type, file_data, file_url)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const [result] = await db.query(sql, [
        lead_source,
        assigned_to || null,
        file_name,
        file_type,
        file_data,
        file_url
      ]);

      return result.insertId;
    } catch (err) {
      console.error("DB Error (create lead):", err);
      throw err;
    }
  }
};

export default Lead;

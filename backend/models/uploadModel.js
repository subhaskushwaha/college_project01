const db = require("../config/db");

// ➤ Insert
exports.createUpload = async ({ file_url, assign_to_agent, source }) => {
  const [result] = await db.query(
    `INSERT INTO uploads (file_url, assign_to_agent, source)
     VALUES (?, ?, ?)`,
    [file_url, assign_to_agent, source]
  );

  return result.insertId;
};

// ➤ Get All
exports.getAllUploads = async () => {
  const [rows] = await db.query(
    `SELECT * FROM uploads ORDER BY id DESC`
  );

  return rows;
};
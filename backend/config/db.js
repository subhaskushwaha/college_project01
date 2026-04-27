import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "call_center",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ MySQL connected successfully!");
    connection.release();
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
  }
})();

export default db;
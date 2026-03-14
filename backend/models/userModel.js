import db from "../config/db.js";

const User = {

  findAllAgents: async () => {
    try {
      const [rows] = await db.query(
        "SELECT id, name, email, phone, status, role, created_at, updated_at FROM users WHERE role = 'agent'"
      );
      return rows;
    } catch (err) {
      console.error("Database Error (findAllAgents):", err);
      throw new Error("Failed to fetch agents");
    }
  },

  findById: async (id) => {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0] || null;
    } catch (err) {
      console.error("Database Error (findById):", err);
      throw new Error("Failed to fetch user by ID");
    }
  },

  findByPhone: async (phone) => {
    try {
      const [rows] = await db.query(
        "SELECT id, name, email, phone, password, role, status FROM users WHERE phone = ? LIMIT 1",
        [phone]
      );
      return rows[0] || null;
    } catch (err) {
      console.error("Database Error (findByPhone):", err);
      throw new Error("Failed to fetch user by phone");
    }
  },

  findByEmail: async (email) => {
    try {
      const [rows] = await db.query(
        "SELECT id, name, email, phone, password, role, status FROM users WHERE email = ? LIMIT 1",
        [email]
      );
      return rows[0] || null;
    } catch (err) {
      console.error("Database Error (findByEmail):", err);
      throw new Error("Failed to fetch user by email");
    }
  },

  createAgent: async ({ name, email, phone, status }) => {
    try {
      const sql = `
        INSERT INTO users (name, email, phone, status, role)
        VALUES (?, ?, ?, ?, 'agent')
      `;
      const [result] = await db.query(sql, [name, email, phone, status]);
      return result.insertId;
    } catch (err) {
      console.error("Database Error (createAgent):", err);
      throw new Error("Failed to create agent");
    }
  },

  createUser: async ({ name, email, password, role }) => {
    try {
      const sql = `
        INSERT INTO users (name, email, password, role)
        VALUES (?, ?, ?, ?)
      `;
      const [result] = await db.query(sql, [name, email, password, role]);
      return result.insertId;
    } catch (err) {
      console.error("Database Error (createUser):", err);
      throw new Error("Failed to create user");
    }
  },

  updateAgent: async (id, { name, email, phone, status }) => {
    try {
      const fields = [];
      const values = [];

      if (name) {
        fields.push("name = ?");
        values.push(name);
      }
      if (email) {
        fields.push("email = ?");
        values.push(email);
      }
      if (phone) {
        fields.push("phone = ?");
        values.push(phone);
      }
      if (status) {
        fields.push("status = ?");
        values.push(status);
      }

      if (!fields.length) {
        throw new Error("No fields to update");
      }

      const sql = `
        UPDATE users 
        SET ${fields.join(", ")} 
        WHERE id = ? AND role = 'agent'
      `;

      values.push(id);

      const [result] = await db.query(sql, values);
      return result.affectedRows;
    } catch (err) {
      console.error("Database Error (updateAgent):", err);
      throw new Error("Failed to update agent");
    }
  },

  deleteAgent: async (id) => {
    try {
      const [result] = await db.query(
        "DELETE FROM users WHERE id = ? AND role = 'agent'",
        [id]
      );
      return result.affectedRows;
    } catch (err) {
      console.error("Database Error (deleteAgent):", err);
      throw new Error("Failed to delete agent");
    }
  },

};

export default User;

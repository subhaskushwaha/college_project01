import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const getAllAgents = async () => {
  return await User.findAllAgents();
};

export const createAgent = async ({ name, email, phone, status }) => {
  if (!name || !email || !phone || !status) {
    const error = new Error("Name, email, phone, and status are required");
    error.statusCode = 400;
    throw error;
  }

  const existing = await User.findByEmail(email);
  if (existing) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  const agentId = await User.createAgent({ name, email, phone, status });
  return agentId;
};


export const updateAgentService = async (id, { name, email, phone, status }) => {

  if (!name && !email && !phone && !status) {
    const error = new Error("At least one field (name, email, phone, status) is required");
    error.statusCode = 400;
    throw error;
  }

  if (email) {
    const existingEmail = await User.findByEmail(email);
    if (existingEmail && existingEmail.id != id) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }
  }

 if (phone) {
  const existingPhone = await User.findByPhone(phone);
  if (existingPhone && existingPhone.id != id) {
    const error = new Error("Phone number already exists");
    error.statusCode = 409;
    throw error;
  }
}

  const updatedRows = await User.updateAgent(id, { name, email, phone, status });
  if (updatedRows === 0) {
    const error = new Error("Agent not found or no changes made");
    error.statusCode = 404;
    throw error;
  }

  return id;
};


export const deleteAgent = async (id) => {
  const deletedRows = await User.deleteAgent(id);
  if (deletedRows === 0) {
    const error = new Error("Agent not found");
    error.statusCode = 404;
    throw error;
  }
  return deletedRows;
};

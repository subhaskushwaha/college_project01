import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const getAllAgents = async () => {
  return await User.find({ role: "agent" }).select("-password");
};

export const createAgent = async ({ name, email, phone, status }) => {
  if (!name || !email || !phone || !status) {
    const error = new Error("Name, email, phone, and status are required");
    error.statusCode = 400;
    throw error;
  }

  const existing = await User.findOne({ email });
  if (existing) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  const randomPassword = Math.random().toString(36).slice(-8);

  const hashedPassword = await bcrypt.hash(randomPassword, 10);

  const agent = await User.create({
    name,
    email,
    phone,
    status,
    password: hashedPassword, 
    role: "agent",
  });

  return agent._id;
};


export const updateAgentService = async (id, { name, email, phone, status }) => {

  if (!name && !email && !phone && !status) {
    const error = new Error("At least one field required");
    error.statusCode = 400;
    throw error;
  }

  if (email) {
    const existingEmail = await User.findOne({ email });
    if (existingEmail && existingEmail._id.toString() !== id) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  if (phone) {
    const existingPhone = await User.findOne({ phone });
    if (existingPhone && existingPhone._id.toString() !== id) {
      const error = new Error("Phone already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  const updated = await User.findOneAndUpdate(
    { _id: id, role: "agent" },
    { name, email, phone, status },
    { new: true }
  );

  if (!updated) {
    const error = new Error("Agent not found");
    error.statusCode = 404;
    throw error;
  }

  return updated._id;
};


export const deleteAgent = async (id) => {
  const deleted = await User.findOneAndDelete({
    _id: id,
    role: "agent",
  });

  if (!deleted) {
    const error = new Error("Agent not found");
    error.statusCode = 404;
    throw error;
  }

  return deleted._id;
};
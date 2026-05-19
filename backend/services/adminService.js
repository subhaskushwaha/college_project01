import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// GET ONLY OWN AGENTS
export const getAllAgents = async (adminId) => {

  return await User.find({
    role: "agent",
    createdBy: adminId,
  }).select("-password");
};

// CREATE AGENT
export const createAgent = async (
  { name, email, phone, status },
  adminId
) => {

  if (!name || !email || !phone || !status) {
    const error = new Error(
      "Name, email, phone, and status are required"
    );
    error.statusCode = 400;
    throw error;
  }

  const existing = await User.findOne({ email });

  if (existing) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  // FIXED PASSWORD
  const randomPassword = "agent123";

  const hashedPassword = await bcrypt.hash(
    randomPassword,
    10
  );

  const agent = await User.create({
    name,
    email,
    phone,
    status,
    password: hashedPassword,
    role: "agent",
    createdBy: adminId,
  });

  return agent._id;
};

export const updateAgentService = async (
  id,
  { name, email, phone, status },
  adminId
) => {

  if (!name && !email && !phone && !status) {
    const error = new Error("At least one field required");
    error.statusCode = 400;
    throw error;
  }

  if (email) {

    const existingEmail = await User.findOne({ email });

    if (
      existingEmail &&
      existingEmail._id.toString() !== id
    ) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  if (phone) {

    const existingPhone = await User.findOne({ phone });

    if (
      existingPhone &&
      existingPhone._id.toString() !== id
    ) {
      const error = new Error("Phone already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  const updated = await User.findOneAndUpdate(
    {
      _id: id,
      role: "agent",
      createdBy: adminId,
    },
    {
      name,
      email,
      phone,
      status,
    },
    {
      new: true,
    }
  );

  if (!updated) {
    const error = new Error("Agent not found");
    error.statusCode = 404;
    throw error;
  }

  return updated._id;
};

// DELETE ONLY OWN AGENT
export const deleteAgent = async (id, adminId) => {

  const deleted = await User.findOneAndDelete({
    _id: id,
    role: "agent",
    createdBy: adminId,
  });

  if (!deleted) {
    const error = new Error("Agent not found");
    error.statusCode = 404;
    throw error;
  }

  return deleted._id;
};
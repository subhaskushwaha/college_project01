// services/adminService.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

// ===============================
// GET ALL OWN AGENTS
// ===============================
export const getAllAgents = async (adminId) => {

  return await User.find({
    role: "agent",
    createdBy: adminId,
  }).select("-password");
};

// ===============================
// CREATE AGENT
// ===============================
export const createAgent = async (
  { name, email, phone, status },
  adminId
) => {

  // Validation
  if (!name || !email || !phone || !status) {
    const error = new Error(
      "Name, email, phone and status are required"
    );

    error.statusCode = 400;
    throw error;
  }

  // Check email exists
  const existingEmail = await User.findOne({
    email,
  });

  if (existingEmail) {
    const error = new Error(
      "Email already exists"
    );

    error.statusCode = 409;
    throw error;
  }

  // Check phone exists
  const existingPhone = await User.findOne({
    phone,
  });

  if (existingPhone) {
    const error = new Error(
      "Phone already exists"
    );

    error.statusCode = 409;
    throw error;
  }

  // Default Password
  const defaultPassword = "agent123";

  const hashedPassword =
    await bcrypt.hash(defaultPassword, 10);

  // Create Agent
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

// ===============================
// UPDATE AGENT
// ===============================
export const updateAgentService = async (
  id,
  { name, email, phone, status },
  adminId
) => {

  // ObjectId validation
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(
      "Invalid agent ID"
    );

    error.statusCode = 400;
    throw error;
  }

  // At least one field required
  if (
    !name &&
    !email &&
    !phone &&
    !status
  ) {
    const error = new Error(
      "At least one field is required"
    );

    error.statusCode = 400;
    throw error;
  }

  // Email check
  if (email) {

    const existingEmail =
      await User.findOne({ email });

    if (
      existingEmail &&
      existingEmail._id.toString() !== id
    ) {
      const error = new Error(
        "Email already exists"
      );

      error.statusCode = 409;
      throw error;
    }
  }

  // Phone check
  if (phone) {

    const existingPhone =
      await User.findOne({ phone });

    if (
      existingPhone &&
      existingPhone._id.toString() !== id
    ) {
      const error = new Error(
        "Phone already exists"
      );

      error.statusCode = 409;
      throw error;
    }
  }

  // Update agent
  const updated =
    await User.findOneAndUpdate(
      {
        _id: id,
        role: "agent",
        createdBy: adminId,
      },

      {
        $set: {
          ...(name && { name }),
          ...(email && { email }),
          ...(phone && { phone }),
          ...(status && { status }),
        },
      },

      {
        new: true,
      }
    );

  // Agent not found
  if (!updated) {

    const error = new Error(
      "Agent not found"
    );

    error.statusCode = 404;
    throw error;
  }

  return updated._id;
};

// ===============================
// DELETE AGENT
// ===============================
export const deleteAgent = async (
  id,
  adminId
) => {

  // ObjectId validation
  if (!mongoose.Types.ObjectId.isValid(id)) {

    const error = new Error(
      "Invalid agent ID"
    );

    error.statusCode = 400;
    throw error;
  }

  const deleted =
    await User.findOneAndDelete({
      _id: id,
      role: "agent",
      createdBy: adminId,
    });

  if (!deleted) {

    const error = new Error(
      "Agent not found"
    );

    error.statusCode = 404;
    throw error;
  }

  return deleted._id;
};
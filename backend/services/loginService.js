import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const loginUser = async ({ email, role }) => {

  if (!email || !role) {
    const error = new Error("Email and role are required");
    error.statusCode = 400;
    throw error;
  }

  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Invalid email");
    error.statusCode = 404;
    throw error;
  }

  // Role check
  if (user.role !== role) {
    const error = new Error(`${role} not found`);
    error.statusCode = 403;
    throw error;
  }

  // Agent status check
  if (user.role === "agent" && user.status !== "active") {
    const error = new Error("Agent account inactive");
    error.statusCode = 403;
    throw error;
  }

  // Token
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    body: {
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  };
};
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  if (!name || !email || !password || !role) {
    const error = new Error("All fields required");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email already registered");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return {
    body: {
      message: "User registered successfully",
      user_id: user._id,
    },
  };
};
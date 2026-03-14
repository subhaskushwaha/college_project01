import { registerUser } from "../services/registerService.js";

export const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: result.body.message,
      user_id: result.body.user_id,
    });
  } catch (error) {
    console.error("Error (register):", error);
    return res.status(error.statusCode || 500).json({
      success: false,
      statusCode: error.statusCode || 500,
      message: error.message || "Internal Server Error",
    });
  }
};

import { loginUser } from "../services/loginService.js";

export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: result.body.message,
      token: result.body.token,
      user: result.body.user,
    });
  } catch (error) {
    console.error("Error (login):", error);
    return res.status(error.statusCode || 500).json({
      success: false,
      statusCode: error.statusCode || 500,
      message: error.message || "Internal Server Error",
    });
  }
};

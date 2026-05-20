// controllers/analyticsController.js
import { getDashboardStatsService } from "../services/analyticsService.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    const data = await getDashboardStatsService(userId, role);

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
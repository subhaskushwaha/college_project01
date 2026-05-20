// controllers/analyticsController.js

import {
  getDashboardStatsService,
} from "../services/analyticsService2.js";

export const getDashboardStatus = async (
  req,
  res
) => {
  try {

    // ONLY AGENT ALLOWED
    if (req.user.role !== "agent") {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. Agent only API",
      });
    }

    const result =
      await getDashboardStatsService(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
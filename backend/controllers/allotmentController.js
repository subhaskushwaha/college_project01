import { autoAssignLeads } from "../services/allotmentService.js";

export const assignLeads = async (req, res) => {

  try {

    const { strategy } = req.body;

    const result = await autoAssignLeads(
      strategy,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Leads assigned successfully",
      data: result,
    });

  } catch (error) {

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.message ||
        "Internal Server Error",
    });
  }
};
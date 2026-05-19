import {
  getAssignedLeadsService,
  logCallService,
  getPerformanceService,
} from "../services/agentPerformanceServices.js";

export const getAssignedLeads = async (
  req,
  res
) => {

  try {

    const result =
      await getAssignedLeadsService(
        req.user.id,
        req.query
      );

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};

export const logCall = async (
  req,
  res
) => {

  try {

    const result = await logCallService(
      req.user.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Call logged successfully",
      data: result,
    });

  } catch (error) {

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPerformance = async (
  req,
  res
) => {

  try {

    const days =
      Number(req.query.days) || 7;

    const result =
      await getPerformanceService(
        req.user.id,
        days
      );

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};
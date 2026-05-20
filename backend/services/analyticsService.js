// services/analyticsService.js
import mongoose from "mongoose";
import Customer from "../models/uploadModel.js";
import User from "../models/userModel.js";
import CallLog from "../models/callLogModel.js";

const getLast7Days = () => {
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
};

const normalizeTrends = (trends) => {
  const trendMap = trends.reduce((acc, item) => {
    acc[item.date] = item;
    return acc;
  }, {});

  return getLast7Days().map((date) => ({
    date,
    calls: trendMap[date]?.calls ?? 0,
    conversions: trendMap[date]?.conversions ?? 0,
  }));
};

export const getDashboardStatsService = async (userId, role) => {

  if (role === "admin") {

    const total_leads = await Customer.countDocuments();

    const new_leads = await Customer.countDocuments({
      status: "new",
    });

    const converted_leads = await Customer.countDocuments({
      status: "converted",
    });

    const total_agents = await User.countDocuments({
      role: "agent",
    });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const today_calls = await CallLog.countDocuments({
      createdAt: {
        $gte: todayStart,
        $lte: todayEnd,
      },
    });

    const today_conversions = await CallLog.countDocuments({
      createdAt: {
        $gte: todayStart,
        $lte: todayEnd,
      },
      call_outcome: "converted",
    });

    const trends = await CallLog.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(
              new Date().setDate(new Date().getDate() - 6)
            ),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },

          calls: {
            $sum: 1,
          },

          conversions: {
            $sum: {
              $cond: [
                {
                  $eq: ["$call_outcome", "converted"],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          calls: 1,
          conversions: 1,
        },
      },
    ]);

    return {
      overview: {
        total_leads,
        new_leads,
        converted_leads,
        total_agents,
        today_calls,
        today_conversions,
      },
      trends: normalizeTrends(trends),
    };
  }

  if (role === "agent") {

    const agentObjectId = new mongoose.Types.ObjectId(userId);

    const my_total_leads =
      await Customer.countDocuments({
        assigned_agent: userId,
      });

    const my_new_leads =
      await Customer.countDocuments({
        assigned_agent: userId,
        status: "new",
      });

    const my_converted_leads =
      await Customer.countDocuments({
        assigned_agent: userId,
        status: "converted",
      });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const my_today_calls =
      await CallLog.countDocuments({
        agent_id: agentObjectId,

        createdAt: {
          $gte: todayStart,
          $lte: todayEnd,
        },
      });

    const my_today_conversions =
      await CallLog.countDocuments({
        agent_id: agentObjectId,

        createdAt: {
          $gte: todayStart,
          $lte: todayEnd,
        },

        call_outcome: "converted",
      });

    const my_weekly_calls =
      await CallLog.aggregate([
        {
          $match: {
            agent_id: agentObjectId,

            createdAt: {
              $gte: new Date(
                new Date().setDate(
                  new Date().getDate() - 6
                )
              ),
            },
          },
        },

        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },

            calls: {
              $sum: 1,
            },

            conversions: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$call_outcome",
                      "converted",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },

        {
          $sort: {
            _id: 1,
          },
        },

        {
          $project: {
            _id: 0,
            date: "$_id",
            calls: 1,
            conversions: 1,
          },
        },
      ]);

    return {
      overview: {
        my_total_leads,
        my_new_leads,
        my_converted_leads,
        my_today_calls,
        my_today_conversions,
      },

      trends: normalizeTrends(my_weekly_calls),
    };
  }

  throw new Error("Invalid role");
};
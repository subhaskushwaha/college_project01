// services/analyticsService.js

import Customer from "../models/uploadModel.js";
import CallLog from "../models/callLogModel.js";
import FollowUp from "../models/followUpModel.js";

export const getDashboardStatsService =
  async (agentId) => {

    // =========================
    // ASSIGNED LEADS
    // =========================

    const assignedLeads =
      await Customer.countDocuments({
        assigned_agent: agentId,
      });

    const previousAssignedLeads =
      await Customer.countDocuments({
        assigned_agent: agentId,

        createdAt: {
          $lt: new Date(
            Date.now() - 7 * 24 * 60 * 60 * 1000
          ),
        },
      });

    const assignedChange =
      assignedLeads -
      previousAssignedLeads;

    // =========================
    // CONVERTED THIS MONTH
    // =========================

    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    const startOfLastMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      1
    );

    const endOfLastMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      0
    );

    const convertedThisMonth =
      await Customer.countDocuments({
        assigned_agent: agentId,
        status: "converted",

        updatedAt: {
          $gte: startOfMonth,
        },
      });

    const convertedLastMonth =
      await Customer.countDocuments({
        assigned_agent: agentId,
        status: "converted",

        updatedAt: {
          $gte: startOfLastMonth,
          $lte: endOfLastMonth,
        },
      });

    const convertedChange =
      convertedThisMonth -
      convertedLastMonth;

    // =========================
    // TOTAL CALLS THIS MONTH
    // =========================

    const totalCallsThisMonth =
      await CallLog.countDocuments({
        agent_id: agentId,

        createdAt: {
          $gte: startOfMonth,
        },
      });

    const totalCallsLastMonth =
      await CallLog.countDocuments({
        agent_id: agentId,

        createdAt: {
          $gte: startOfLastMonth,
          $lte: endOfLastMonth,
        },
      });

    // =========================
    // CONVERSION RATE
    // =========================

    const conversionRate =
      totalCallsThisMonth > 0
        ? (
            (convertedThisMonth /
              totalCallsThisMonth) *
            100
          ).toFixed(1)
        : 0;

    const lastMonthRate =
      totalCallsLastMonth > 0
        ? (
            (convertedLastMonth /
              totalCallsLastMonth) *
            100
          ).toFixed(1)
        : 0;

    const conversionRateChange =
      Number(conversionRate) -
      Number(lastMonthRate);

    // =========================
    // CALLS TODAY
    // =========================

    const startOfToday = new Date();

    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();

    endOfToday.setHours(
      23,
      59,
      59,
      999
    );

    const callsToday =
      await CallLog.countDocuments({
        agent_id: agentId,

        createdAt: {
          $gte: startOfToday,
          $lte: endOfToday,
        },
      });

    // =========================
    // CALLS YESTERDAY
    // =========================

    const startOfYesterday =
      new Date();

    startOfYesterday.setDate(
      startOfYesterday.getDate() - 1
    );

    startOfYesterday.setHours(
      0,
      0,
      0,
      0
    );

    const endOfYesterday =
      new Date();

    endOfYesterday.setDate(
      endOfYesterday.getDate() - 1
    );

    endOfYesterday.setHours(
      23,
      59,
      59,
      999
    );

    const callsYesterday =
      await CallLog.countDocuments({
        agent_id: agentId,

        createdAt: {
          $gte: startOfYesterday,
          $lte: endOfYesterday,
        },
      });

    const callsTodayChange =
      callsToday - callsYesterday;

    // =========================
    // PENDING TASKS
    // =========================

    const pendingTasks =
      await FollowUp.countDocuments({
        agent_id: agentId,
        status: "scheduled",

        scheduled_date: {
          $lte: new Date(),
        },
      });

    // =========================
    // FINAL RESPONSE
    // =========================

    return {
      assigned_leads: {
        value: assignedLeads,

        change: Math.abs(
          assignedChange
        ),

        change_type:
          assignedChange >= 0
            ? "increase"
            : "decrease",
      },

      converted_this_month: {
        value: convertedThisMonth,

        change: Math.abs(
          convertedChange
        ),

        change_type:
          convertedChange >= 0
            ? "increase"
            : "decrease",
      },

      conversion_rate: {
        value: Number(
          conversionRate
        ),

        change: Math.abs(
          conversionRateChange
        ),

        change_type:
          conversionRateChange >= 0
            ? "increase"
            : "decrease",
      },

      calls_today: {
        value: callsToday,

        change: Math.abs(
          callsTodayChange
        ),

        change_type:
          callsTodayChange >= 0
            ? "increase"
            : "decrease",
      },

      pending_tasks: pendingTasks,
    };
  };
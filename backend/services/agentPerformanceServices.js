import Customer from "../models/customerModel.js";
import CallLog from "../models/callLogModel.js";
import FollowUp from "../models/followUpModel.js";
import AgentPerformance from "../models/agentPerformanceModel.js";

// =======================================
// GET ASSIGNED LEADS
// =======================================
export const getAssignedLeadsService =
  async (agentId, query) => {

    const {
      status,
      search,
    } = query;

    const filter = {
      assigned_agent_id: agentId,
    };

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        {
          customer_name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    return await Customer.find(filter);
  };

// =======================================
// LOG CALL
// =======================================
export const logCallService =
  async (agentId, data) => {

    const {
      customer_id,
      call_status,
      call_outcome,
      remarks,
      duration,
      next_follow_up,
    } = data;

    // SAVE CALL LOG
    const callLog =
      await CallLog.create({
        customer_id,
        agent_id: agentId,
        call_status,
        call_outcome,
        remarks,
        duration,
        next_follow_up,
      });

    // ===================================
    // UPDATE CUSTOMER STATUS
    // ===================================
    let customerStatus = "new";

    if (
      call_outcome === "contacted"
    ) {
      customerStatus = "contacted";
    }

    else if (
      call_outcome === "converted"
    ) {
      customerStatus = "converted";
    }

    else if (
      call_outcome ===
      "not_interested"
    ) {
      customerStatus =
        "not_interested";
    }

    await Customer.findByIdAndUpdate(
      customer_id,
      {
        status: customerStatus,
      }
    );

    // ===================================
    // UPDATE DAILY PERFORMANCE
    // ===================================
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    let performance =
      await AgentPerformance.findOne({
        agent_id: agentId,
        date: today,
      });

    if (!performance) {

      performance =
        await AgentPerformance.create({
          agent_id: agentId,
          date: today,
        });
    }

    performance.total_calls += 1;

    performance.total_duration +=
      duration || 0;

    if (
      call_outcome ===
      "contacted"
    ) {
      performance.successful_calls += 1;
    }

    if (
      call_outcome ===
      "converted"
    ) {
      performance.conversions += 1;
    }

    await performance.save();

    // ===================================
    // CREATE FOLLOW UP
    // ===================================
    if (next_follow_up) {

      await FollowUp.create({
        customer_id,
        agent_id: agentId,
        next_follow_up,
        remarks,
      });
    }

    return callLog;
  };

// =======================================
// GET PERFORMANCE
// =======================================
export const getPerformanceService =
  async (agentId, days) => {

    const fromDate = new Date();

    fromDate.setDate(
      fromDate.getDate() - days
    );

    const performance =
      await AgentPerformance.find({
        agent_id: agentId,
        date: {
          $gte: fromDate,
        },
      });

    let totalCalls = 0;
    let conversions = 0;
    let successfulCalls = 0;

    performance.forEach((item) => {

      totalCalls += item.total_calls;

      conversions += item.conversions;

      successfulCalls +=
        item.successful_calls;
    });

    const successRate =
      totalCalls > 0
        ? (
            (successfulCalls /
              totalCalls) *
            100
          ).toFixed(2)
        : 0;

    return {
      totalCalls,
      successfulCalls,
      conversions,
      successRate:
        `${successRate}%`,
      performance,
    };
  };
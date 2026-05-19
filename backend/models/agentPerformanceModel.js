import mongoose from "mongoose";

const agentPerformanceSchema =
  new mongoose.Schema(
    {
      agent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      date: Date,

      total_calls: {
        type: Number,
        default: 0,
      },

      successful_calls: {
        type: Number,
        default: 0,
      },

      conversions: {
        type: Number,
        default: 0,
      },

      total_duration: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

const AgentPerformance =
  mongoose.models.AgentPerformance ||
  mongoose.model(
    "AgentPerformance",
    agentPerformanceSchema
  );

export default AgentPerformance;
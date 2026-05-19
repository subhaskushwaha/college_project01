import mongoose from "mongoose";

const dataAllotmentLogSchema = new mongoose.Schema(
  {
    strategy: {
      type: String,
      enum: [
        "round_robin",
        "performance_based",
        "workload_balanced",
      ],
      required: true,
    },

    total_leads: {
      type: Number,
      required: true,
    },

    agents_involved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    allotted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DataAllotmentLog =
  mongoose.models.DataAllotmentLog ||
  mongoose.model(
    "DataAllotmentLog",
    dataAllotmentLogSchema
  );

export default DataAllotmentLog;
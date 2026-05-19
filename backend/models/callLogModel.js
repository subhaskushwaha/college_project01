import mongoose from "mongoose";

const callLogSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    agent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    call_status: {
      type: String,
      enum: ["answered", "missed", "busy"],
    },

    call_outcome: {
      type: String,
      enum: [
        "contacted",
        "converted",
        "not_interested",
      ],
    },

    remarks: String,

    duration: Number,

    next_follow_up: Date,
  },
  {
    timestamps: true,
  }
);

const CallLog =
  mongoose.models.CallLog ||
  mongoose.model("CallLog", callLogSchema);

export default CallLog;
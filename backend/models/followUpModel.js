import mongoose from "mongoose";

const followUpSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    agent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    next_follow_up: Date,

    remarks: String,
  },
  {
    timestamps: true,
  }
);

const FollowUp =
  mongoose.models.FollowUp ||
  mongoose.model("FollowUp", followUpSchema);

export default FollowUp;
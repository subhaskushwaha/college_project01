import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    customer_name: String,
    contact_number: String,
    email: String,
    status: {
      type: String,
      default: "Not Called",
    },
    agent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    customer_name: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    campaign_type: String,
    status: {
      type: String,
      enum: ["new", "contacted", "converted"],
      default: "new",
    },
    assigned_agent: String,
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
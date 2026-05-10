// models/customerModel.js
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  customer_name: String,
  phone: String,
  email: String,
  address: String,
  city: String,
  campaign_type: String,
  assigned_agent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    default: null,
  },
});

// 🔥 IMPORTANT FIX
const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
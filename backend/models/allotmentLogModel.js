import mongoose from "mongoose";

const allotmentLogSchema = new mongoose.Schema({
  strategy: String,
  total_leads: Number,
  agents_involved: Number,
  allotted_by: String,
}, { timestamps: true });

const AllotmentLog = mongoose.model("AllotmentLog", allotmentLogSchema);

// ✅ IMPORTANT
export default AllotmentLog;
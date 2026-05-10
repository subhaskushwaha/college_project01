// models/agentModel.js
import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  name: String,
  email: String,
  conversion_rate: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Agent", agentSchema);
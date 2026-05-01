import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
  {
    file_url: { type: String, required: true },
    assign_to_agent: { type: String, required: true },
    source: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Upload", uploadSchema);
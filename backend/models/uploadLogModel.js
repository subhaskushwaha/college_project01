import mongoose from "mongoose";

const uploadLogSchema = new mongoose.Schema({
  row_data: Object,
  error: String,
}, { timestamps: true });

const UploadLog =
  mongoose.models.UploadLog ||
  mongoose.model("UploadLog", uploadLogSchema);

export default UploadLog;
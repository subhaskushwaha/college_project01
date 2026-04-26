const uploadModel = require("../models/uploadModel");

// ➤ Save
exports.saveUpload = async ({ file_url, assign_to_agent, source }) => {
  const uploadId = await uploadModel.createUpload({
    file_url,
    assign_to_agent,
    source
  });

  return {
    upload_id: uploadId
  };
};

// ➤ Get All
exports.getUploads = async () => {
  const data = await uploadModel.getAllUploads();
  return data;
};
import { createUpload, getAllUploads } from "../models/uploadModel.js";

// ➤ Save
export const saveUpload = async ({ file_url, assign_to_agent, source }) => {
  const uploadId = await createUpload({
    file_url,
    assign_to_agent,
    source
  });

  return {
    upload_id: uploadId
  };
};

// ➤ Get All
export const getUploads = async () => {
  const data = await getAllUploads();
  return data;
};
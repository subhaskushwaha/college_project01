import Upload from "../models/uploadModel.js";

export const saveUpload = async ({ file_url, assign_to_agent, source }) => {
  const newUpload = await Upload.create({
    file_url,
    assign_to_agent,
    source,
  });

  return {
    upload_id: newUpload._id,
  };
};

export const getUploads = async () => {
  const data = await Upload.find().sort({ _id: -1 });
  return data;
};
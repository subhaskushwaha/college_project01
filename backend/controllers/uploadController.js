import { 
  saveUpload, 
  getUploads as getUploadsService 
} from "../services/uploadService.js";

// ✅ Upload
export const uploadLeads = async (req, res) => {
  try {
    const file = req.file;
    const { source, agent_name } = req.body || {};

    if (!file || !agent_name) {
      return res.status(400).json({
        success: false,
        message: "file and agent_name required",
      });
    }

    const result = await saveUpload({
      file_url: file.path,
      assign_to_agent: agent_name,
      source,
    });

    res.status(200).json({
      success: true,
      upload_id: result.upload_id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Uploads
export const getUploads = async (req, res) => {
  try {
    const data = await getUploadsService(); // ✅ correct call

    res.json({
      success: true,
      count: data.length,
      data,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
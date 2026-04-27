import { saveUpload, getUploads as getAllUploads } from "../services/uploadService.js";

// ➤ POST
export const uploadLeads = async (req, res) => {
  try {
    const { file_url, assign_to_agent, source } = req.body;

    if (!file_url || !assign_to_agent) {
      return res.status(400).json({
        success: false,
        message: "file_url and assign_to_agent required"
      });
    }

    const result = await saveUpload({
      file_url,
      assign_to_agent,
      source
    });

    res.json({
      success: true,
      message: "Data saved successfully",
      ...result
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// ➤ GET
export const getUploads = async (req, res) => {
  try {
    const data = await getAllUploads();

    res.json({
      success: true,
      count: data.length,
      data
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};
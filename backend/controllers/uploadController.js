import { uploadLeadService } from "../services/uploadService.js";

export const uploadLeadController = async (req, res) => {
  try {
    const host = `${req.protocol}://${req.get("host")}`;
    const response = await uploadLeadService(req.body, req.file, host);

    return res.status(response.statusCode).json(response);

  } catch (err) {
    console.error("Controller Error:", err);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Unexpected server error"
    });
  }
};
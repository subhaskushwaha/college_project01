
import { processFileService } from "../services/uploadService2.js";

export const uploadFileController = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "File required"
      });
    }

    const result = await processFileService(req.file.path);

    res.status(200).json({
      message: "File uploaded successfully",
      result
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};
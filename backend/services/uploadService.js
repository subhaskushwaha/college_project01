import Lead from "../models/uploadModel.js";
import fs from "fs";

export const uploadLeadService = async (body, file, host) => {
  try {
    if (!body.lead_source || !body.assigned_to || !file) {
      return {
        success: false,
        statusCode: 400,
        message: "lead_source, assigned_to, and file are required"
      };
    }

    // file buffer → base64
    const fileBuffer = fs.readFileSync(file.path);
    const base64File = fileBuffer.toString("base64");

    const fileUrl = `${host}/uploads/${file.filename}`;

    const leadData = {
      lead_source: body.lead_source,
      assigned_to: body.assigned_to,
      file_name: file.originalname,
      file_type: file.mimetype,
      file_data: base64File,
      file_url: fileUrl
    };

    const insertId = await Lead.create(leadData);

    return {
      success: true,
      statusCode: 201,
      message: "Lead saved successfully",
      lead_id: insertId,
      file_url: fileUrl
    };

  } catch (err) {
    console.error("Service Error:", err);
    return {
      success: false,
      statusCode: 500,
      message: "Internal Server Error"
    };
  }
};

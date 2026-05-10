// ===============================
// 📁 services/uploadService.js
// ===============================

import fs from "fs";
import csv from "csv-parser";
import XLSX from "xlsx";

import Customer from "../models/customerModel.js";
import UploadLog from "../models/uploadLogModel.js";

export const processFileService = async (filePath) => {

  const ext = filePath.split(".").pop();

  let rows = [];

  // ===============================
  // CSV PARSE
  // ===============================
  if (ext === "csv") {

    rows = await new Promise((resolve, reject) => {

      const data = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => data.push(row))
        .on("end", () => resolve(data))
        .on("error", reject);
    });
  }

  // ===============================
  // EXCEL PARSE
  // ===============================
  else if (ext === "xlsx" || ext === "xls") {

    const workbook = XLSX.readFile(filePath);

    const sheetName = workbook.SheetNames[0];

    rows = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );
  }

  else {
    throw new Error("Unsupported file format");
  }

  let validRows = [];
  let invalidRows = [];

  // ===============================
  // VALIDATION
  // ===============================
  for (let row of rows) {

    const {
      customer_name,
      phone,
      email,
      address,
      city,
      campaign_type
    } = row;

    // basic validation
    if (
      !customer_name ||
      !phone ||
      !email
    ) {

      invalidRows.push({
        row_data: row,
        error: "Missing required fields"
      });

      continue;
    }

    validRows.push({
      customer_name,
      phone,
      email,
      address,
      city,
      campaign_type
    });
  }

  // ===============================
  // BULK INSERT
  // ===============================
  if (validRows.length) {
    await Customer.insertMany(validRows);
  }

  // ===============================
  // INVALID LOG SAVE
  // ===============================
  if (invalidRows.length) {
    await UploadLog.insertMany(invalidRows);
  }

  // ===============================
  // DELETE FILE AFTER PROCESS
  // ===============================
  fs.unlinkSync(filePath);

  return {
    total: rows.length,
    inserted: validRows.length,
    skipped: invalidRows.length
  };
};
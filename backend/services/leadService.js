import Lead from "../models/leadModel.js";
import csv from "csv-parser";
import fs from "fs";

export const handleLeadOperations = async ({ action, filePath, leadId, agentId }) => {
  if (action === "upload") {
    return new Promise((resolve, reject) => {
      const leads = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          leads.push({
            name: row.name,
            phone: row.phone,
            email: row.email,
            status: row.status || "Not Called",
          });
        })
        .on("end", async () => {
          try {
            const inserted = await Lead.bulkInsert(leads);
            resolve({ message: `${inserted} leads uploaded successfully` });
          } catch (err) {
            reject(err);
          }
        })
        .on("error", reject);
    });
  }

  if (action === "assign") {
    const updated = await Lead.assignLead(leadId, agentId);
    if (!updated) throw new Error("Lead assignment failed");
    return { message: "Lead assigned successfully" };
  }

  throw new Error("Invalid action");
};


export const getLeads = async () => {
  return await Lead.getAllLeads();
};

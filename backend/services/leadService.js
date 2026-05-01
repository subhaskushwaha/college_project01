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
            customer_name: row.name,
            contact_number: row.phone,
            email: row.email,
            status: row.status || "Not Called",
          });
        })
        .on("end", async () => {
          try {
            const inserted = await Lead.insertMany(leads); 
            resolve({ message: `${inserted.length} leads uploaded successfully` });
          } catch (err) {
            reject(err);
          }
        })
        .on("error", reject);
    });
  }

  if (action === "assign") {
    const updated = await Lead.findByIdAndUpdate(
      leadId,
      { agent_id: agentId },
      { new: true }
    );

    if (!updated) throw new Error("Lead assignment failed");

    return { message: "Lead assigned successfully" };
  }

  throw new Error("Invalid action");
};


// ✅ GET ALL LEADS
export const getLeads = async () => {
  return await Lead.find().populate("agent_id", "name email");
};
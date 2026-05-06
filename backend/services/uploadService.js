import fs from "fs";
import csv from "csv-parser";
import xlsx from "xlsx";
import Customer from "../models/uploadModel.js";

export const processFileAndSave = async (filePath, mimetype, agent_name) => {
  try {
    let leads = [];
    
   if (mimetype === "text/csv") {
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on("data", (row) => {

            if (!row.customer_name && !row.phone) return;

            leads.push({
              customer_name: row.customer_name || "",
              phone: row.phone || "",
              email: row.email || "",
              address: row.address || "",
              city: row.city || "",
              campaign_type: row.campaign_type || "",
              assigned_agent: agent_name, 
            });
          })
          .on("end", resolve)
          .on("error", reject);
      });
    }

  
    else {
      const workbook = xlsx.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(sheet);

      leads = data
        .filter((row) => row.customer_name || row.phone) 
        .map((row) => ({
          customer_name: row.customer_name || "",
          phone: row.phone || "",
          email: row.email || "",
          address: row.address || "",
          city: row.city || "",
          campaign_type: row.campaign_type || "",
          assigned_agent: agent_name, 
        }));
    }

    if (leads.length === 0) {
      throw new Error("No valid data found in file");
    }

    console.log("Leads before insert:", leads.slice(0, 2)); 

    await Customer.insertMany(leads);

    const latest = await Customer.find()
      .sort({ createdAt: -1 })
      .limit(3);

    console.log("Latest from DB:", latest);

    return leads.length;

  } catch (error) {
    console.error("Error in processFileAndSave:", error);
    throw error;
  }
};

export const getLeadsService = async (queryParams) => {
  const {
    page = 1,
    limit = 10,
    status,
    campaign_type,
    assigned_agent,
    search,
  } = queryParams;

  let query = {};

  if (status) query.status = status;
  if (campaign_type) query.campaign_type = campaign_type;
  if (assigned_agent) query.assigned_agent = assigned_agent;

  if (search) {
    query.$or = [
      { customer_name: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const total = await Customer.countDocuments(query);

  const data = await Customer.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  return {
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    data,
  };
};
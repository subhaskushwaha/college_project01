import { getLeadSummary, getAllLeads } from "../models/reportModel.js";
import { Parser } from "json2csv";
import PDFDocument from "pdfkit";
import fs from "fs";

export const generateSummaryService = async () => {
  return await getLeadSummary();
};

export const exportCSVService = async () => {
  const leads = await getAllLeads();

  const fields = [
    "customer_name",
    "contact_number",
    "status",
    "remarks",
    "follow_up_date",
    "createdAt",
  ];

  const parser = new Parser({ fields });
  const csv = parser.parse(leads);

  const filePath = "reports/leads_report.csv";

  if (!fs.existsSync("reports")) {
    fs.mkdirSync("reports");
  }

  fs.writeFileSync(filePath, csv);

  return filePath;
};


export const exportPDFService = async () => {
  const leads = await getAllLeads();

  const filePath = "reports/leads_report.pdf";

  if (!fs.existsSync("reports")) {
    fs.mkdirSync("reports");
  }

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text("Leads Report", { align: "center" });
  doc.moveDown();

  leads.forEach((lead) => {
    doc
      .fontSize(12)
      .text(`Name: ${lead.customer_name}`)
      .text(`Phone: ${lead.contact_number}`)
      .text(`Status: ${lead.status}`)
      .text(`Remarks: ${lead.remarks || "N/A"}`)
      .text(`Follow-up Date: ${lead.follow_up_date || "N/A"}`)
      .moveDown();
  });

  doc.end();

  return filePath;
};
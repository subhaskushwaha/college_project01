import {
  generateSummaryService,
  exportCSVService,
  exportPDFService,
} from "../services/reportService.js";

export const getReportSummary = async (req, res) => {
  try {
    const summary = await generateSummaryService();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Report summary generated successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message || "Internal server error",
    });
  }
};

export const exportCSV = async (req, res) => {
  try {
    const filePath = await exportCSVService();

    res.download(filePath, "leads_report.csv", (err) => {
      if (err) {
        console.error("CSV download error:", err);
        res.status(500).json({
          success: false,
          statusCode: 500,
          message: "Error downloading CSV file",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message || "Internal server error",
    });
  }
};

export const exportPDF = async (req, res) => {
  try {
    const filePath = await exportPDFService();

    res.download(filePath, "leads_report.pdf", (err) => {
      if (err) {
        console.error("PDF download error:", err);
        res.status(500).json({
          success: false,
          statusCode: 500,
          message: "Error downloading PDF file",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message || "Internal server error",
    });
  }
};

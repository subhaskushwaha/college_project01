import express from "express";
import { getReportSummary, exportCSV, exportPDF,} from "../controllers/reportController.js";

const router = express.Router();

router.get("/summary", getReportSummary);

router.get("/export/csv", exportCSV);

router.get("/export/pdf", exportPDF);

export default router;

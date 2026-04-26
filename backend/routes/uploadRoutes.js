const express = require("express");
const router = express.Router();

const uploadController = require("../controllers/uploadController");

router.post("/upload", uploadController.uploadLeads);

router.get("/uploads", uploadController.getUploads);

module.exports = router;
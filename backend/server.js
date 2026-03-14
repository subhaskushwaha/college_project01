// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const leadRoutes = require("./routes/leadRoutes")

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use("/api/auth", authRoutes);
// app.use("/api/admin" ,adminRoutes);
// app.use("/api/leads" ,leadRoutes);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js"; 
import adminRoutes from "./routes/adminRoutes.js"  
import leadRoutes from "./routes/leadRoutes.js"; 
import agentRoutes from "./routes/agentRoutes.js"; 
import  reportRoutes from "./routes/reportRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin" ,adminRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api", uploadRoutes);

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
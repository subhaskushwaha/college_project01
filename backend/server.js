import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import autoAssignLeads from "./routes/autoAssignLeads.js";
import uploadRoutes2 from "./routes/uploadRoutes2.js";
import agentPerformanceRoutes from "./routes/agentPerformanceRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://callcenterdataalloments.netlify.app"
  ],
  credentials: true
}));

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api", uploadRoutes);
app.use("/api/allotment", autoAssignLeads);
app.use("/api/files", uploadRoutes2);
app.use("/api/agentPerformance", agentPerformanceRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.post("/chat", async (req, res) => {
  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    console.log("USER:", message);

    const result = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
    });

    const botReply = result.choices[0].message.content;

    console.log("AI:", botReply);

    return res.status(200).json({
      success: true,
      generated_text: botReply
    });

  } catch (error) {

    console.log("ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Something went wrong"
    });
  }
});

app.use((err, req, res, next) => {

  console.error("Unhandled Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
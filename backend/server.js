import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// ===== MONGO DB CONNECTION =====
const MONGO_URI = "mongodb://localhost:27017/studentPortfolioDB";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🟢 MongoDB Connected Successfully"))
  .catch((err) => console.log("🔴 MongoDB Connection Error:", err));

// ===== ROUTES =====
app.use("/api/projects", projectRoutes);

// ===== START SERVER =====
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});

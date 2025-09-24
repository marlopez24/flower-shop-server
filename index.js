import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const app = express();

console.log("✅ index.js loaded");

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/orders", orderRoutes);
console.log("✅ Mounted orderRoutes at /api/orders");

// Test root
app.get("/", (req, res) => res.send("Server is running"));

// Connect to MongoDB
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error(err));

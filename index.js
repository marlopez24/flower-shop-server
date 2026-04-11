import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"], // Allow frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
// app.options("*", cors());
app.options(/.*/, cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("➡️ Request hitting server:", req.method, req.url);
  next();
});

// Mount routes
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

app.get("/test", (req, res) => res.send("Test route works"));
// Test root
app.get("/", (req, res) => res.send("Server is running"));

// Connect to MongoDB
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT);
  })
  .catch((err) => console.error(err));

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server running...");
});

// Orders storage (in-memory for now)
let orders = [];

// Route to create new order
app.post("/api/orders", (req, res) => {
  const order = req.body; // frontend sends cart + customer info
  order.id = Date.now(); // simple unique id
  orders.push(order);
  res.status(201).json({ message: "Order received", order });
});

// Route to get all orders
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

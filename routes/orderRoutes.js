import express from "express";
import Order from "../models/Order.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/test", (req, res) => res.send("Test route working"));

router.get("/", authMiddleware, async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

router.post("/", async (req, res) => {
  try {
    const { name, email, address, items } = req.body;
    const newOrder = new Order({
      customer: { name, email, address },
      cart: items,
    });
    console.log("Saving order:", newOrder);
    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch {
    console.error("Error saving order:", err);
    res.status(500).json({ error: "Failed to save order" });
  }
});

router.put("/:id/status", authMiddleware, async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

router.delete("/:id/remove", authMiddleware, async (req, res) => {
  console.log("DELETE request received for ID:", req.params.id);
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted succesfully", order: deletedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.use((req, res) => {
  console.log("Unmatched request in orderRoutes:", req.method, req.originalUrl);
  res.status(404).json({ error: "Route not found in orderRoutes" });
});

export default router;

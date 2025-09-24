import express from "express";
const router = express.Router();
import Order from "../models/Order.js";

console.log("✅ orderRoutes.js loaded");

router.get("/test", (req, res) => res.send("Test route working"));

router.get("/", async (req, res) => {
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

router.put("/:id/status", async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

export default router;

import express from "express";
import Order from "../models/Order.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/test", (req, res) => res.send("Test route working"));

// most are admin and user actions

router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find();

    if (orders.length === 0) {
      return res.json([]);
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// not in use
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({ message: "Order detail not found" });
    }
    res.json(orderId);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//  user actions
router.post("/", async (req, res) => {
  try {
    const { name, email, address, phone, items } = req.body;
    const newOrder = new Order({
      customer: { name, email, address, phone },
      cart: items,
    });

    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ error: "Failed to save order" });
  }
});

router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// admin action only I think
router.delete("/:id/remove", authMiddleware, async (req, res) => {
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

export default router;

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    address: String,
  },
  cart: [
    {
      name: String,
      price: Number,
    },
  ],
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "In-Progress", "Ready", "Completed"],
  },
});

export default mongoose.model("Order", orderSchema);

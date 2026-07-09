import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    address: String,
    phone: String,
    customSize: String,
    customColors: String,
    customFlowers: String,
    occasion: String,
    customNotes: String,
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
    enum: ["Pending", "In Progress", "Ready", "Completed"],
  },
  paymentStatus: {
    type: String,
    default: "Awaiting Payment",
  },
});

export default mongoose.model("Order", orderSchema);

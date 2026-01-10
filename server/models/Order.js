import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, ref: "User" },
    items: [
      {
        product: { type: String, required: true, ref: "Product" },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: String, required: true, ref: "Address" },
    status: { type: String, default: "Order placed" },
    PaymentMethod: { type: String, default: "Order placed", required: true },
    isPaid: { type: Boolean, default: "false", required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

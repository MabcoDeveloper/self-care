import mongoose from "mongoose";
// models/Address.js - Temporary fix
const addressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, default: "State not provided" }, // Changed from required
  pincode: { type: String, required: true },
  country: { type: String, default: "India" },
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

const Address = mongoose.model("Address", addressSchema)

export default Address 
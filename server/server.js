import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/clodinary.js";

// Ensure all models are registered
import "./models/index.js";

import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/ClerkWebhooks.js";
import { stripeWebhooks } from "./controllers/stripeWebhook.js";

import userRouter from "./routes/userRoute.js";
import addressRouter from "./routes/addressRoute.js";
import cartRouter from "./routes/cartRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";

/* -------------------- INIT -------------------- */

const app = express();

/* -------------------- DATABASE -------------------- */
await connectDB();
await connectCloudinary();

/* -------------------- CORS -------------------- */
app.use(
  cors({
    origin: process.env.CLIENT_URL, // REQUIRED for Render
    credentials: true,
  })
);

/* -------------------- STRIPE WEBHOOK -------------------- */
/**
 * Stripe REQUIRES raw body.
 * This MUST be before express.json()
 */
app.post(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

/* -------------------- JSON PARSER -------------------- */
app.use(express.json());

/* -------------------- CLERK -------------------- */
app.use(clerkMiddleware());

/* -------------------- ROUTES -------------------- */
app.use("/api/clerk", clerkWebhooks);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

/* -------------------- HEALTH CHECK -------------------- */
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

/* -------------------- START SERVER -------------------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

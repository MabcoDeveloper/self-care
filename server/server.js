import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
// Ensure all models are registered with mongoose
import "./models/index.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/ClerkWebhooks.js";
import userRouter from "./routes/userRoute.js";
import connectCloudinary from "./config/clodinary.js";
import addressRouter from "./routes/addressRoute.js";
import cartRouter from "./routes/cartRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/stripeWebhook.js";

await connectDB(); // Establish connection to the database
await connectCloudinary(); // setup cloudinary for image storage

const app = express(); //initialze express application
// Enable Cross-origin Resource sharing and allow credentials (cookies)
// Support a comma-separated list in CLIENT_URLS (or single CLIENT_URL) so
// the deployed frontend(s) can be allowed. Example: CLIENT_URLS="https://fe1,https://fe2"
const clientUrlsEnv = process.env.CLIENT_URLS || process.env.CLIENT_URL || "http://localhost:5173";
const allowedOrigins = clientUrlsEnv.split(",").map(s => s.trim()).filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // allow non-browser requests like curl, server-to-server (origin==undefined)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    console.warn('Blocked CORS origin:', origin);
    return callback(null, false);
  },
  credentials: true,
}));

// api to listen stripe webhooks
app.post(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

//Middleware Setup
app.use(express.json()); // enables JSON request body parsing
// Log incoming cookies and auth-related headers for debugging Clerk auth issues
app.use((req, res, next) => {
  //console.log('Incoming request:', req.method, req.path, { cookie: req.headers.cookie, authorization: req.headers.authorization });
  next();
});

app.use(clerkMiddleware());

// Log whether Clerk secret is present (don't print the value)
console.log('CLERK_SECRET_KEY present:', !!process.env.CLERK_SECRET_KEY);

// Dev-only debug route to inspect Clerk auth results (remove in production)
app.get('/api/debug/auth', (req, res) => {
  try {
    const auth = typeof req.auth === 'function' ? req.auth() : null;
    return res.json({ success: true, auth, user: req.user || null });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
});

//API to listen clerk webhooks
app.use("/api/clerk", clerkWebhooks);

//define api routes
app.use("/api/user", userRouter); // routes for user functionality
app.use("/api/products", productRouter); // routes for handling products
app.use("/api/addresses", addressRouter); // routes for handling addresses
app.use("/api/cart", cartRouter); // routes for handling cart
app.use("/api/orders", orderRouter); // routes for handling order

// Route Endpoint to check API Status
app.get("/", (req, res) => {
  res.send("API Successfully connected");
});

const port = process.env.PORT || 3000; //Define server port

// Start the server
app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);

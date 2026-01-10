const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/mongodb.js");
// Ensure all models are registered with mongoose
require("./models/index.js");
const { clerkMiddleware } = require("@clerk/express");
const clerkWebhooks = require("./controllers/ClerkWebhooks.js");
const userRouter = require("./routes/userRoute.js");
const connectCloudinary = require("./config/clodinary.js");
const addressRouter = require("./routes/addressRoute.js");
const cartRouter = require("./routes/cartRoute.js");
const productRouter = require("./routes/productRoute.js");
const orderRouter = require("./routes/orderRoute.js");
const { stripeWebhooks } = require("./controllers/stripeWebhook.js");

// Use async wrapper since top-level await isn't available in CommonJS
async function startServer() {
  try {
    await connectDB(); // Establish connection to the database
    await connectCloudinary(); // setup cloudinary for image storage
    
    const app = express(); //initialize express application
    
    // Enable Cross-origin Resource sharing and allow credentials (cookies)
    app.use(
      cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
      })
    );

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
      console.log('Incoming request:', req.method, req.path, { 
        cookie: req.headers.cookie, 
        authorization: req.headers.authorization 
      });
      next();
    });

    app.use(clerkMiddleware());

    // Log whether Clerk secret is present (don't print the value)
    console.log('CLERK_SECRET_KEY present:', !!process.env.CLERK_SECRET_KEY);

    // Dev-only debug route to inspect Clerk auth results (remove in production)
    app.get('/api/debug/auth', (req, res) => {
      try {
        const auth = typeof req.auth === 'function' ? req.auth() : null;
        return res.json({ 
          success: true, 
          auth, 
          user: req.user || null 
        });
      } catch (e) {
        return res.json({ 
          success: false, 
          message: e.message 
        });
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

    // Health check for Render (ADD THIS)
    app.get("/health", (req, res) => {
      res.json({ 
        status: "OK", 
        timestamp: new Date(),
        service: "self-care-server",
        env: process.env.NODE_ENV
      });
    });

    // Route Endpoint to check API Status
    app.get("/", (req, res) => {
      res.send("API Successfully connected");
    });

    const port = process.env.PORT || 3000; //Define server port

    // Start the server
    app.listen(port, () =>
      console.log(`Server is running at http://localhost:${port}`)
    );
    
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/ClerkWebhooks.js"
import userRouter from "./routes/userRoute.js"
import connectCloudinary from "./config/clodinary.js"
import addressRouter from "./routes/addressRoute.js"


await connectDB()  // Establish connection to the database
await connectCloudinary // setup cloudinary for image storage

const app = express() //initialze express application
app.use(cors()) // Enable Cross-origin Resource sharing

//Middleware Setup
app.use(express.json()) // enables JSON request body parsing
app.use(clerkMiddleware())

//API to listen clerk webhooks
app.use("/api/clerk", clerkWebhooks)

//define api routes
app.use('/api/user',userRouter) // routes for user functionality
app.use('/api/products',userRouter) // routes for handling products 
app.use('/api/products',addressRouter) // routes for handling addresses 

// Route Endpoint to check API Status
app.get('/', (req,res) => {
    res.send("API Successfully connected")
})

const port = process.env.PORT || 3000 //Define server port 

// Start the server
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`))

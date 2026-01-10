import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log("Database Connected"+process.env.MONGO_URI)
    } catch (error) {
        console.log("Database Connection failed: ", error.message)
    }
}

export default connectDB
import express from "express"
import { getUserProfile } from "../controllers/userController.js"
import authUser from "../middlewares/authMiddleware.js"

const userRouter = express.Router()

userRouter.get('/',authUser,getUserProfile)

export default userRouter
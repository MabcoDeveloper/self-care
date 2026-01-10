import express from "express";
import authUser from "../middlewares/authMiddleware.js";
import { addToCart, addToCartById, updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/add-by-id", authUser, addToCartById);
cartRouter.post("/update", authUser, updateCart);

export default cartRouter;

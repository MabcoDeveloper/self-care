import express from "express";
import {
  allOrders,
  placedOrderCOD,
  placedOrderStripe,
  updateStatus,
  userOrders,
} from "../controllers/orderController.js";
import authUser from "../middlewares/authMiddleware.js";

const orderRouter = express.Router();

// For Admin
orderRouter.post("/", authUser, allOrders);
orderRouter.post("/status", authUser, updateStatus);
// For payment
orderRouter.post("/cod", authUser, placedOrderCOD);
orderRouter.post("/stripe", authUser, placedOrderStripe);
//For User
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;

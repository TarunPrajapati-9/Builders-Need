import express, { Router } from "express";
import { getOrders } from "../Controllers/Seller/orders/getOrders";
import { authenticate } from "../Middleware/jwtAuthentication";
import { updateOrderStatus } from "../Controllers/Seller/orders/updateOrders";

const router: Router = express.Router();

// for seller
router.get("/orders", authenticate, getOrders);
router.put("/order/:orderId/status", authenticate, updateOrderStatus);

export default router;

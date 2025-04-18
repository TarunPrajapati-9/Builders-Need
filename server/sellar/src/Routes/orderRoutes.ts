import express, { Router } from "express";
import { getOrders } from "../Controllers/orders/getOrders";
import { authenticateSeller } from "../Middleware/jwtAuthentication";
import { updateOrderStatus } from "../Controllers/orders/updateOrders";

const router: Router = express.Router();

router.get("/orders", authenticateSeller, getOrders);
router.put("/order/:orderId/status", authenticateSeller, updateOrderStatus);

export default router;

import express, { Router } from "express";
import { sendOtp, verifyOtp } from "../Utils/sendOtp";
import { registerSeller } from "../Controllers/Seller/authentication/register";
import { loginSeller } from "../Controllers/Seller/authentication/login";
import { getSellerProfile } from "../Controllers/Seller/getDetails/profile";
import { authenticate } from "../Middleware/jwtAuthentication";
import {
  checkSellerAndSendOtp,
  updatePassword,
} from "../Controllers/Seller/authentication/updatePassword";
import {
  deleteAccount,
  updateProfile,
} from "../Controllers/Seller/authentication/updateAndDelete";
import {
  getOrderById,
  getSellerOrders,
} from "../Controllers/Seller/orders/getOrders";
import { updateOrderStatus } from "../Controllers/Seller/orders/updateOrders";

const router: Router = express.Router();

//login and register routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register", registerSeller);
router.post("/login", loginSeller);

// Password reset routes
router.post("/forget-password/send-otp", checkSellerAndSendOtp);
router.post("/forget-password/verify-otp", verifyOtp);
router.post("/forget-password/update-password", updatePassword);

//update and delete routes
router.put("/update-profile", authenticate, updateProfile);
router.put("/my-orders/:orderId", authenticate, updateOrderStatus);
router.delete("/delete-account", authenticate, deleteAccount);

//get routes
router.get("/profile", authenticate, getSellerProfile);
router.get("/my-orders", authenticate, getSellerOrders);
router.get("/my-orders/:orderId", authenticate, getOrderById);

export default router;

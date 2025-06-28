import express, { Router } from "express";
import { registerUser } from "../Controllers/User/authentication/register";
import { loginUser } from "../Controllers/User/authentication/login";
import {
  checkUserAndSendOtp,
  updateUserPassword,
} from "../Controllers/User/authentication/updatePassword";
import { verifyOtp } from "../Utils/sendOtp";
import { addToCart } from "../Controllers/User/cart/addItem";
import { authenticate } from "../Middleware/jwtAuthentication";
import {
  clearCart,
  deleteCartItem,
  updateCartItemQuantity,
} from "../Controllers/User/cart/updateItem";
import { getCartItems } from "../Controllers/User/getDetails/cart";
import { makeOrder } from "../Controllers/User/orders/makeOrder";
import { getUserOrders } from "../Controllers/User/orders/manageOrders";
import { getUserProfile } from "../Controllers/User/getDetails/profile";

const router: Router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forget-password/send-otp", checkUserAndSendOtp);
router.post("/forget-password/verify-otp", verifyOtp);
router.post("/forget-password/update-password", updateUserPassword);
router.post("/cart", authenticate, addToCart);
router.post("/makeOrder", authenticate, makeOrder);

router.get("/profile", authenticate, getUserProfile);
router.get("/my-orders", authenticate, getUserOrders);
router.get("/cart", authenticate, getCartItems);

router.put("/update-profile"); //pending
router.put("/update-cart-item-quantity", authenticate, updateCartItemQuantity);

router.delete("/delete-cart-item", authenticate, deleteCartItem);
router.delete("/clear-cart", authenticate, clearCart);

export default router;

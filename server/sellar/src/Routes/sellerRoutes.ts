import express, { Router } from "express";
import { sendOtp, verifyOtp } from "../Controllers/authentication/sendOtp";
import { registerSeller } from "../Controllers/authentication/register";
import { loginSeller } from "../Controllers/authentication/login";
import { getSellerProfile } from "../Controllers/getDetails/profile";
import { authenticateSeller } from "../Middleware/jwtAuthentication";
import {
  checkSellerAndSendOtp,
  updatePassword,
} from "../Controllers/authentication/updatePassoword";
import {
  deleteAccount,
  updateProfile,
} from "../Controllers/authentication/updateAndDelete";

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
router.put("/update-profile", authenticateSeller, updateProfile);
router.delete("/delete-account", authenticateSeller, deleteAccount);

//get routes
router.get("/profile", authenticateSeller, getSellerProfile);

export default router;

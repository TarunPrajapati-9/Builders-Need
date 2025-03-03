import express, { Router, Request, Response, NextFunction } from "express";
import { sendOtp, verifyOtp } from "../Controllers/authentication/sendOtp";
import { registerSeller } from "../Controllers/authentication/register";
import { loginSeller } from "../Controllers/authentication/login";
import { getSellerProfile } from "../Controllers/getDetails/profile";
import { authenticateSeller } from "../Middleware/jwtAuthentication";

const router: Router = express.Router();

//post routes

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register", registerSeller);
router.post("/login", loginSeller);

//get routes
router.get("/profile", authenticateSeller, getSellerProfile);

export default router;

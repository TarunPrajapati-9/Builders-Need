import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Seller from "../../Models/Seller"; // Assuming your model
import { createResponse } from "../../Utils/createResponse";
import { otpVerifiedStore } from "./sendOtp"; // import verified store
import { sendOtp } from "./sendOtp"; // Assuming your sendOtp function exists

export const checkSellerAndSendOtp = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    // Check if the seller exists with the provided email
    const seller = await Seller.findOne({ email });

    if (!seller) {
      res.status(404).json({ message: "Seller not found with this email" });
      return;
    }

    // If seller exists, send OTP
    await sendOtp(req, res); // Use the existing sendOtp function to send the OTP
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updatePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      res
        .status(400)
        .json(createResponse(false, "Email and new password are required", []));
      return;
    }

    // 🔐 Check if OTP was verified
    if (!otpVerifiedStore[email]) {
      res
        .status(403)
        .json(createResponse(false, "OTP verification required!", []));
      return;
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    const updatedSeller = await Seller.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedSeller) {
      res.status(404).json(createResponse(false, "Seller not found", []));
      return;
    }

    // Clear verified status after successful update
    delete otpVerifiedStore[email];

    res.json(createResponse(true, "Password updated successfully", { email }));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

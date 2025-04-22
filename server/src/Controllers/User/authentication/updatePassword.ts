import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createResponse } from "../../../Utils/createResponse";
import { otpVerifiedStore, sendOtp } from "../../../Utils/sendOtp";
import User from "../../../Models/User";

export const checkUserAndSendOtp = async (
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
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found with this email" });
      return;
    }

    // If seller exists, send OTP
    await sendOtp(req, res); // Use the existing sendOtp function to send the OTP
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateUserPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
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
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password in database
    const updatedSeller = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedSeller) {
      res.status(404).json(createResponse(false, "User not found", []));
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

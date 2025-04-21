import { Request, Response } from "express";
import { createResponse } from "../../../Utils/createResponse";
import Seller from "../../../Models/Seller";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { otpVerifiedStore } from "../../../Utils/sendOtp";
import User from "../../../Models/User";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, phoneNumber, address, pincode } = req.body;

    // Basic validation
    if (!name || !email || !password || !phoneNumber || !address || !pincode) {
      res
        .status(400)
        .json(createResponse(false, "All fields are required", []));
      return;
    }
    if (!otpVerifiedStore[email]) {
      res
        .status(403)
        .json(createResponse(false, "OTP verification required!", []));
      return;
    }

    // Check if seller already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json(createResponse(false, "User already exists", []));
      return;
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new seller document
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      pincode,
      phoneNumber,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d", // Token valid for 7 days
      }
    );
    // Clear verified status after successful update
    delete otpVerifiedStore[email];
    // Success response
    res.json(createResponse(true, "User registered successfully", { token }));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

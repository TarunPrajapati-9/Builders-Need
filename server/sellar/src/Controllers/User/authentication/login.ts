import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../../Models/User";
import { createResponse } from "../../../Utils/createResponse";
import { otpVerifiedStore } from "../../../Utils/sendOtp";

dotenv.config();

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password, otp } = req.body;

    if (!email) {
      res.status(400).json(createResponse(false, "Email is required", []));
      return;
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).json(createResponse(false, "User not found", []));
      return;
    }

    // OTP based Login Flow
    if (otp) {
      const isVerified = otpVerifiedStore[email];
      if (!isVerified) {
        res
          .status(400)
          .json(createResponse(false, "Invalid or Unverified OTP", []));
        return;
      }

      // OTP Verified: Clear the flag
      delete otpVerifiedStore[email];

      const token = jwt.sign(
        { id: existingUser._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );

      res.json(
        createResponse(true, "User logged in successfully using OTP", {
          token,
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        })
      );
      return;
    }

    // Password based Login Flow
    if (password) {
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!passwordMatch) {
        res.status(400).json(createResponse(false, "Invalid Credentials", []));
        return;
      }

      const token = jwt.sign(
        { id: existingUser._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );

      res.json(
        createResponse(true, "User logged in successfully using Password", {
          token,
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        })
      );
      return;
    }

    // If neither OTP nor Password provided
    res
      .status(400)
      .json(createResponse(false, "OTP or Password is required", []));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

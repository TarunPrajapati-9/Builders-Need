import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { createResponse } from "./createResponse";

// Define OTP storage type
interface OtpEntry {
  otp: number;
  expiresAt: number;
}

// Store OTPs temporarily (Ideally, use Redis or a database)
let otpStore: Record<string, OtpEntry> = {};
export let otpVerifiedStore: Record<string, boolean> = {};

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL as string,
    pass: process.env.USER_PASSWORD as string,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Send OTP function
export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req.body.email;
    if (!email) {
      res.status(400).json(createResponse(false, "Email is required", []));
      return;
    }

    const otp = Math.floor(Math.random() * 900000) + 100000;

    const mailOptions = {
      from: process.env.USER_EMAIL as string,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    };

    // Wrap sendMail in a promise
    await new Promise<void>((resolve, reject) => {
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };
    res.json(createResponse(true, "OTP sent successfully", { email }));
  } catch (error: any) {
    res
      .status(500)
      .json(
        createResponse(false, "Error sending email", { error: error.message })
      );
  }
};

// Verify OTP function
export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      res
        .status(400)
        .json(createResponse(false, "Email and OTP are required", []));
      return;
    }

    const otpData = otpStore[email];
    if (!otpData) {
      res.status(400).json(createResponse(false, "No OTP found", []));
      return;
    }

    if (Date.now() > otpData.expiresAt) {
      delete otpStore[email];
      res.status(400).json(createResponse(false, "OTP expired", []));
      return;
    }

    if (otpData.otp !== Number(otp)) {
      res.status(400).json(createResponse(false, "Invalid OTP", []));
      return;
    }

    // ✅ OTP verified — allow password update later
    otpVerifiedStore[email] = true;
    delete otpStore[email];

    res.json(createResponse(true, "OTP verified successfully", { email }));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

import { Request, Response } from "express";
import { createResponse } from "../../Utils/createResponse";
import Seller from "../../Models/Seller";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const registerSeller = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, location, sellerType, phone } = req.body;

    // Basic validation
    if (!name || !email || !password || !location || !sellerType || !phone) {
      res
        .status(400)
        .json(createResponse(false, "All fields are required", []));
      return;
    }

    // Check if seller already exists by email
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      res.status(400).json(createResponse(false, "Seller already exists", []));
      return;
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new seller document
    const newSeller = new Seller({
      name,
      email,
      password: hashedPassword,
      location,
      sellerType,
      phone,
    });

    await newSeller.save();

    // Generate JWT token
    // const token = jwt.sign(
    //   { id: newSeller._id },
    //   process.env.JWT_SECRET as string,
    //   {
    //     expiresIn: "7d", // Token valid for 7 days
    //   }
    // );

    // Success response
    res.json(createResponse(true, "Seller registered successfully", {}));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

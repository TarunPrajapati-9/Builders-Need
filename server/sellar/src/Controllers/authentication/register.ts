import { Request, Response } from "express";
import { createResponse } from "../../Utils/createResponse";
import Seller from "../../Models/Seller";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerSeller = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, location, type, items } = req.body;
    if (!name || !email || !password || !location || !type || !items) {
      res
        .status(400)
        .json(createResponse(false, "All fields are required", []));
      return;
    }

    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      res.status(400).json(createResponse(false, "Seller already exists", []));
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({
      name,
      email,
      password: hashedPassword,
      location,
      type,
      items,
    });
    await newSeller.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newSeller._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d", // Token expiry
      }
    );

    res.json(createResponse(true, "Seller registered successfully", { token }));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

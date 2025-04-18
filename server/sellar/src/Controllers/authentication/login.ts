import { Request, Response } from "express";
import { createResponse } from "../../Utils/createResponse";
import Seller from "../../Models/Seller";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginSeller = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json(createResponse(false, "Credentials are required", []));
      return;
    }

    const existingSeller = await Seller.findOne({ email });
    if (!existingSeller) {
      res.status(400).json(createResponse(false, "Seller not found", []));
      return;
    }

    const passwordMatch = await bcrypt.compare(
      password,
      existingSeller!.password
    );
    if (!passwordMatch) {
      res.status(400).json(createResponse(false, "Invalid Credentials", []));
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingSeller!._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d", // Token expiry
      }
    );

    res.json(
      createResponse(true, "Seller logged in successfully", {
        token,
        id: existingSeller._id,
        name: existingSeller.name,
        email: existingSeller.email,
        sellerType: existingSeller.sellerType,
        location: existingSeller.location,
      })
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

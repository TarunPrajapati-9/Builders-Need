import { Request, Response } from "express";
import { createResponse } from "../../../Utils/createResponse";
import Admin from "../../../Models/Admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res
        .status(400)
        .json(createResponse(false, "Username and password are required", []));
      return;
    }

    // Check if the admin exists with the provided email
    const admin = await Admin.findOne({ username });

    if (!admin) {
      res.status(404).json(createResponse(false, "Invalid Credentials", []));
      return;
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, admin!.password);
    if (!passwordMatch) {
      res.status(400).json(createResponse(false, "Invalid Credentials", []));
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin!._id },
      process.env.JWT_ADMIN_SECRET as string,
      {
        expiresIn: "7d", // Token expiry
      }
    );

    res.status(200).json(createResponse(true, "Login successful", { token }));
  } catch (error) {
    res.status(500).json(createResponse(false, "Internal Server Error", error));
  }
};

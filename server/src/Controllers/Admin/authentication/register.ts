import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Admin from "../../../Models/Admin";

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      res
        .status(409)
        .json({ message: "Admin with this email already exists." });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

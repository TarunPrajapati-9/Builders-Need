import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createResponse } from "../Utils/createResponse";

dotenv.config();

// Extend Request interface to include user ID
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    res
      .status(401)
      .json(createResponse(false, "Access denied. No token provided.", []));
    return;
  }

  try {
    const decoded = jwt.verify(
      token!.replace("Bearer ", ""),
      process.env.JWT_ADMIN_SECRET as string
    );
    req.user = decoded; // Store decoded user data in request object
    next();
  } catch (error) {
    res.status(400).json(createResponse(false, "Invalid token.", { error }));
  }
};

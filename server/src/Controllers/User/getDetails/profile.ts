import { Request, Response } from "express";
import { createResponse } from "../../../Utils/createResponse";
import User from "../../../Models/User";

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user.id; // Extracted from JWT token

    const user = await User.findById(userId).select("-password"); // Exclude password
    if (!user) {
      res.status(404).json(createResponse(false, "User not found", []));
      return;
    }

    res.json(
      createResponse(true, "User profile retrieved successfully", {
        user,
      })
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

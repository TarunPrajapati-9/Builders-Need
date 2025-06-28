import { Request, Response } from "express";
import { createResponse } from "../../../Utils/createResponse";
import UserWallet from "../../../Models/Wallet";

export const getWallet = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in the request

    if (!userId) {
      res.status(400).json(createResponse(false, "User ID is required", null));
      return;
    }

    const wallet = await UserWallet.findOne({ userId });

    if (!wallet) {
      res.status(404).json(createResponse(false, "Wallet not found", null));
      return;
    }

    res
      .status(200)
      .json(createResponse(true, "Wallet retrieved successfully", wallet));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Error retrieving wallet", error));
  }
};

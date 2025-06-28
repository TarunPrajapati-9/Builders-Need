import { Request, Response } from "express";
import UserWallet from "../../../Models/Wallet";
import { createResponse } from "../../../Utils/createResponse";
import bcrypt from "bcrypt";

export const createWallet = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in the request
    const { pin } = req.body;

    if (!userId || !pin) {
      res
        .status(400)
        .json(createResponse(false, "userId and pin are required", null));
      return;
    }

    const existingWallet = await UserWallet.findOne({ userId });
    if (existingWallet) {
      res
        .status(200)
        .json(createResponse(true, "Wallet already exists", existingWallet));
      return;
    }

    const hashedPin = await bcrypt.hash(pin, 10);

    const newWallet = await UserWallet.create({
      userId,
      pin: hashedPin,
      balance: 0,
      transactions: [],
      lastUpdated: new Date(),
    });

    res
      .status(201)
      .json(createResponse(true, "Wallet created successfully", newWallet));
  } catch (error) {
    console.log(error);
    res.status(500).json(createResponse(false, "Error creating wallet", error));
  }
};

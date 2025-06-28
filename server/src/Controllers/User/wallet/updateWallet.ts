import { Request, Response } from "express";
import { createResponse } from "../../../Utils/createResponse";
import UserWallet from "../../../Models/Wallet";
import bcrypt from "bcrypt";

export const updatePin = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in the request
    const { oldPin, newPin } = req.body;

    if (!userId || !oldPin || !newPin) {
      res
        .status(400)
        .json(createResponse(false, "All fields are required", null));
      return;
    }

    const wallet = await UserWallet.findOne({ userId });
    if (!wallet) {
      res.status(404).json(createResponse(false, "Wallet not found", null));
      return;
    }

    const isMatch = await bcrypt.compare(oldPin, wallet.pin);
    if (!isMatch) {
      res.status(400).json(createResponse(false, "Old PIN is incorrect", null));
      return;
    }

    const newHashedPin = await bcrypt.hash(newPin, 10);

    wallet.pin = newHashedPin;
    await wallet.save();

    res
      .status(200)
      .json(createResponse(true, "PIN updated successfully", null));
  } catch (error) {
    res.status(500).json(createResponse(false, "Error updating PIN", error));
  }
};

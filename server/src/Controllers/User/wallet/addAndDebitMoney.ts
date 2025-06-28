import { Request, Response } from "express";
import { createResponse } from "../../../Utils/createResponse";
import UserWallet, { Transaction } from "../../../Models/Wallet";
import bcrypt from "bcrypt";

export const addMoney = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { amount, refId } = req.body;

    if (!userId || !amount || !refId) {
      res
        .status(400)
        .json(
          createResponse(false, "userId, amount, and refId are required", null)
        );
      return;
    }

    const wallet = await UserWallet.findOne({ userId });
    if (!wallet) {
      res.status(404).json(createResponse(false, "Wallet not found", null));
      return;
    }

    // Check for duplicate refId
    const duplicate = wallet.transactions.find(
      (t: Transaction) => t.refId === refId
    );
    if (duplicate) {
      res
        .status(409)
        .json({ success: false, message: "Transaction already exists" });
      return;
    }

    // Create transaction record
    const transaction = {
      amount,
      type: "credit",
      refId,
      status: "pending",
      date: new Date(),
    };

    // Update wallet balance
    // wallet.balance += amount;
    wallet.lastUpdated = new Date();
    wallet.transactions.push(transaction as Transaction);

    await wallet.save();

    res.status(200).json(
      createResponse(true, "Money added successfully", {
        balance: wallet.balance,
        transaction,
      })
    );
  } catch (error) {
    res.status(500).json(createResponse(false, "Error adding money", error));
  }
};

export const debitMoney = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { amount, pin } = req.body;

    if (!userId || !amount || !pin) {
      res
        .status(400)
        .json(
          createResponse(false, "userId, amount, and pin are required", null)
        );
      return;
    }

    const wallet = await UserWallet.findOne({ userId });
    if (!wallet) {
      res.status(404).json(createResponse(false, "Wallet not found", null));
      return;
    }
    const isMatch = await bcrypt.compare(pin, wallet.pin);
    if (!isMatch) {
      res.status(400).json(createResponse(false, "Incorrect PIN", null));
      return;
    }

    if (wallet.balance < amount) {
      res.status(400).json(createResponse(false, "Insufficient balance", null));
      return;
    }

    // Create transaction record
    // Generate a unique refId for the debit transaction
    const refId = `debit_${userId}_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const transaction = {
      type: "debit",
      amount,
      refId,
      status: "approved",
      date: new Date(),
    };

    // Update wallet balance
    wallet.balance -= amount;
    wallet.lastUpdated = new Date();
    wallet.transactions.push(transaction as Transaction);

    await wallet.save();

    res.status(200).json(
      createResponse(true, "Money debited successfully", {
        balance: wallet.balance,
        transaction,
      })
    );
  } catch (error) {
    res.status(500).json(createResponse(false, "Error debiting money", error));
  }
};

import { Request, Response } from "express";
import { createResponse } from "../../../Utils/createResponse";
import UserWallet from "../../../Models/Wallet";

export const updatePaymentStatus = async (req: Request, res: Response) => {
  try {
    const { userId, referenceId, status } = req.body;

    // Validate input
    if (!userId || !referenceId || !status) {
      res
        .status(400)
        .json(createResponse(false, "All fields are required", []));
      return;
    }

    // Update the transaction status
    // Update the transaction status
    const result = await UserWallet.updateOne(
      { userId, "transactions.refId": referenceId },
      { $set: { "transactions.$.status": status } },
      { runValidators: true }
    );

    // If status is approved, update the balance
    if (status === "approved" && result.modifiedCount > 0) {
      // Find the transaction amount
      const wallet = await UserWallet.findOne({
        userId,
        "transactions.refId": referenceId,
      });
      const transaction = wallet?.transactions.find(
        (t: any) => t.refId === referenceId
      );

      if (transaction && typeof transaction.amount === "number") {
        await UserWallet.updateOne(
          { userId },
          { $inc: { balance: transaction.amount } }
        );
      }
    }

    if (result.modifiedCount === 0) {
      res
        .status(404)
        .json(
          createResponse(false, "Transaction not found or already updated", [])
        );
      return;
    }

    res
      .status(200)
      .json(createResponse(true, "Payment status updated successfully", []));
  } catch (error) {
    console.error("Error updating payment status:", error);
    res
      .status(500)
      .json(createResponse(false, "Failed to update payment status", error));
  }
};

import { Request, Response } from "express";
import UserWallet from "../../../Models/Wallet";
import { createResponse } from "../../../Utils/createResponse";

export const getAllCreditTransactions = async (req: Request, res: Response) => {
  try {
    const results = await UserWallet.aggregate([
      { $unwind: "$transactions" }, // Step 1: Flatten transactions array
      { $match: { "transactions.type": "credit" } }, // Step 2: Only credit
      {
        $lookup: {
          from: "users", // Name of the users collection (MongoDB auto-pluralizes "User")
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" }, // Step 3: Flatten user info
      {
        $project: {
          _id: 0,
          userId: "$userInfo._id",
          userName: "$userInfo.name",
          userEmail: "$userInfo.email",
          referenceId: "$transactions.refId",
          amount: "$transactions.amount",
          status: "$transactions.status",
          date: "$transactions.date",
        },
      },
      { $sort: { "transactions.date": -1 } }, // Optional: latest first
    ]);

    res
      .status(200)
      .json(
        createResponse(true, "All credit transactions with user info", results)
      );
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json(
        createResponse(false, "Failed to fetch credit transactions", error)
      );
  }
};

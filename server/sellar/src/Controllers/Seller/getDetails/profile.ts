import { Request, Response } from "express";
import { createResponse } from "../../../Utils/createResponse";
import Seller from "../../../Models/Seller";

export const getSellerProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sellerId = req.user.id; // Extracted from JWT token

    const seller = await Seller.findById(sellerId).select("-password"); // Exclude password
    if (!seller) {
      res.status(404).json(createResponse(false, "Seller not found", []));
      return;
    }

    res.json(
      createResponse(true, "Seller profile retrieved successfully", {
        seller,
      })
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

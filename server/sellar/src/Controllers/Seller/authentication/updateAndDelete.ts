// updateProfile.ts
import { Request, Response } from "express";
import Seller from "../../../Models/Seller";
import { createResponse } from "../../../Utils/createResponse";

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, phone, location, sellerType } = req.body;

    // Get seller ID from authenticated middleware
    const sellerId = req.user.id;

    // if (!name || !phone || !location) {
    //   res
    //     .status(400)
    //     .json(createResponse(false, "All fields are required!", []));
    //   return;
    // }

    const updatedSeller = await Seller.findByIdAndUpdate(
      sellerId,
      { name, phone, location, sellerType },
      { new: true }
    );

    if (!updatedSeller) {
      res.status(404).json(createResponse(false, "Seller not found!", []));
      return;
    }

    res.json(
      createResponse(true, "Profile updated successfully!", updatedSeller)
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

export const deleteAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Get seller ID from authenticated middleware
    const sellerId = req.user.id;

    const deletedSeller = await Seller.findByIdAndDelete(sellerId);

    if (!deletedSeller) {
      res.status(404).json(createResponse(false, "Seller not found!", []));
      return;
    }

    res.json(
      createResponse(true, "Account deleted successfully!", {
        id: sellerId,
        name: deletedSeller.name,
      })
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

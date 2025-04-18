import { Request, Response } from "express";
import Order from "../../Models/Order";
import { createResponse } from "../../Utils/createResponse";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const sellerId = req.user.id;

    const orders = await Order.find({ sellerId }).populate("items.itemId");

    res.json(createResponse(true, "Orders fetched successfully!", orders));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

import { Request, Response } from "express";
import Order from "../../../Models/Order";
import { createResponse } from "../../../Utils/createResponse";

export const makeOrder = async (req: Request, res: Response) => {
  try {
    const { items, totalAmount, sellerId } = req.body;
    const userId = req.user.id;
    if (!userId) {
      res.status(401).json(createResponse(false, "Unauthorized", null));
      return;
    }
    if (!sellerId) {
      res
        .status(401)
        .json(createResponse(false, "Seller ID is required", null));
      return;
    }

    if (!items || items.length === 0) {
      res.status(400).json(createResponse(false, "Items are required", []));
      return;
    }

    const newOrder = new Order({
      userId,
      sellerId,
      items,
      totalAmount,
    });

    await newOrder.save();

    res.json(createResponse(true, "Order created successfully!", newOrder));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

import { Request, Response } from "express";
import Order from "../../../Models/Order";
import { createResponse } from "../../../Utils/createResponse";

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).populate("items.itemId");
    // console.log(orders);

    res.json(createResponse(true, "Orders fetched successfully!", orders));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

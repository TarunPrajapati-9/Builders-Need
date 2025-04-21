import { Request, Response } from "express";
import Order from "../../../Models/Order";
import { createResponse } from "../../../Utils/createResponse";

export const getSellerOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sellerId = req.user.id;

    const orders = await Order.find({ sellerId })
      .populate("items.itemId") // Get full item details
      .populate("userId"); // Get full user details

    res.json(createResponse(true, "Orders fetched successfully!", orders));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

export const getOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      res.status(400).json(createResponse(false, "Order ID is required!", {}));
      return;
    }

    const order = await Order.findById(orderId)
      .populate("items.itemId")
      .populate("userId");

    if (!order) {
      res.status(404).json(createResponse(false, "Order not found!", {}));
      return;
    }

    res.json(createResponse(true, "Order fetched successfully!", order));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

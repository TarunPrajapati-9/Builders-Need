import { Request, Response } from "express";
import Order from "../../../Models/Order";
import { createResponse } from "../../../Utils/createResponse";

export const updateOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      res.status(404).json(createResponse(false, "Order not found!", []));
      return;
    }

    order.status = status;
    await order.save();

    res.json(createResponse(true, "Order status updated!", order));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      res.status(400).json(createResponse(false, "Order ID is required!", {}));
      return;
    }

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      res
        .status(404)
        .json(createResponse(false, "Order not found!", deletedOrder));
      return;
    }

    res.json(createResponse(true, "Order deleted successfully!", deletedOrder));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

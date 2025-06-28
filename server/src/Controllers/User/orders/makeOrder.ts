import { Request, Response } from "express";
import Order from "../../../Models/Order";
import Item from "../../../Models/Item";
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

    // Validate stock availability and prepare updates
    const stockUpdates = [];
    for (const orderItem of items) {
      const { itemId, quantity } = orderItem;
      
      if (!itemId || !quantity || quantity <= 0) {
        res.status(400).json(createResponse(false, "Invalid item data", null));
        return;
      }

      // Find the item and check stock
      const item = await Item.findById(itemId);
      if (!item) {
        res.status(404).json(createResponse(false, `Item with ID ${itemId} not found`, null));
        return;
      }

      if (item.status === "out-of-stock" || item.status === "discontinued") {
        res.status(400).json(createResponse(false, `Item "${item.name}" is not available`, null));
        return;
      }

      if (quantity > item.quantity) {
        res.status(400).json(createResponse(false, `Insufficient stock for item "${item.name}". Available: ${item.quantity}, Requested: ${quantity}`, null));
        return;
      }

      // Calculate new quantity and status
      const newQuantity = item.quantity - quantity;
      const newStatus = newQuantity === 0 ? "out-of-stock" : item.status;
      
      stockUpdates.push({
        itemId,
        newQuantity,
        newStatus
      });
    }

    // Update stock for all items
    for (const update of stockUpdates) {
      await Item.findByIdAndUpdate(update.itemId, {
        quantity: update.newQuantity,
        status: update.newStatus
      });
    }

    const newOrder = new Order({
      userId,
      sellerId,
      items,
      totalAmount: totalAmount,
    });

    await newOrder.save();

    res.json(createResponse(true, "Order created successfully!", newOrder));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

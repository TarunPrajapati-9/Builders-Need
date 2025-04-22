import { Request, Response } from "express";
import Item from "../../../Models/Item";
import { createResponse } from "../../../Utils/createResponse";

// Update Item
export const updateItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { itemId } = req.params; // Assuming itemId is passed as a URL parameter
    const {
      name,
      description,
      category,
      imageUrl,
      price,
      quantity,
      discount,
      status,
    } = req.body;

    if (!itemId) {
      res
        .status(400)
        .json(createResponse(false, "Item ID is required for update.", []));
      return;
    }

    // Seller ID from middleware
    const sellerId = req.user.id;

    const item = await Item.findOne({ _id: itemId, sellerId });

    if (!item) {
      res
        .status(404)
        .json(
          createResponse(false, "Item not found or you are not authorized.", [])
        );
      return;
    }

    // Update fields if provided
    item.name = name || item.name;
    item.description = description || item.description;
    item.category = category || item.category;
    item.imageUrl = imageUrl || item.imageUrl;
    item.price = price || item.price;
    item.quantity = quantity || item.quantity;
    item.discount = discount || item.discount;
    item.status = status || item.status;

    await item.save();

    res
      .status(200)
      .json(createResponse(true, "Item updated successfully!", item));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

// Delete Item
export const deleteItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { itemId } = req.params;

    if (!itemId) {
      res
        .status(400)
        .json(createResponse(false, "Item ID is required for deletion.", []));
      return;
    }

    // Seller ID from middleware
    const sellerId = req.user.id;

    const item = await Item.findOneAndDelete({ _id: itemId, sellerId });

    if (!item) {
      res
        .status(404)
        .json(
          createResponse(false, "Item not found or you are not authorized.", [])
        );
      return;
    }

    res
      .status(200)
      .json(createResponse(true, "Item deleted successfully!", item));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

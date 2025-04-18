import { Request, Response } from "express";
import Item from "../../Models/Item";
import { createResponse } from "../../Utils/createResponse";

export const addItem = async (req: Request, res: Response): Promise<void> => {
  try {
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

    if (
      !name ||
      !description ||
      !category ||
      !imageUrl ||
      !price ||
      !quantity
    ) {
      res
        .status(400)
        .json(createResponse(false, "All required fields must be filled!", []));
      return;
    }

    // sellerId from middleware decoded token
    const sellerId = req.user.id;

    const newItem = new Item({
      name,
      description,
      category,
      sellerId, // Automatically assign from token
      imageUrl,
      price,
      quantity,
      discount: discount || 0,
      status: status || "active",
    });

    await newItem.save();

    res
      .status(201)
      .json(createResponse(true, "Item added successfully!", newItem));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

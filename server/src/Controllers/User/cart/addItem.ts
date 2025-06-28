import { Request, Response } from "express";
import Item from "../../../Models/Item";
import { createResponse } from "../../../Utils/createResponse";
import Cart from "../../../Models/Cart";
import { Types } from "mongoose";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, sellerId, quantity } = req.body;

    const item = await Item.findById(productId);
    if (!item) {
      res.status(404).json(createResponse(false, "Product not found", null));
      return;
    }
    const userId = req.user.id;
    if (!userId) {
      res.status(401).json(createResponse(false, "Unauthorized", null));
      return;
    }
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            productId: item._id,
            productName: item.name,
            productPrice: item.price * (1 - (item.discount ?? 0) / 100),
            productImage: item.imageUrl,
            quantity,
            sellerId,
          },
        ],
      });
    } else {
      const existingItem = cart.items.find((i) =>
        i.productId.equals(productId)
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          productId: item._id as Types.ObjectId,
          productName: item.name,
          productPrice: item.price * (1 - (item.discount ?? 0) / 100),
          productImage: item.imageUrl,
          quantity,
          sellerId,
        });
      }
    }

    await cart.save();
    res
      .status(200)
      .json(createResponse(true, "Item added to cart successfully!", cart));
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json(createResponse(false, "Something went wrong!", error.message));
  }
};

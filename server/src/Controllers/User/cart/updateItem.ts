import { Request, Response } from "express";
import Cart from "../../../Models/Cart";
import { createResponse } from "../../../Utils/createResponse";

export const updateCartItemQuantity = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    if (!userId) {
      res.status(401).json(createResponse(false, "Unauthorized", null));
      return;
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json(createResponse(false, "Cart not found", null));
      return;
    }

    const item = cart.items.find((i) => i.productId.equals(productId));

    if (!item) {
      res
        .status(404)
        .json(createResponse(false, "Product not found in cart", null));
      return;
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => !i.productId.equals(productId));
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    res
      .status(200)
      .json(
        createResponse(true, "Cart item quantity updated successfully", cart)
      );
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json(createResponse(false, "Something went wrong!", error.message));
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;
    if (!userId) {
      res.status(401).json(createResponse(false, "Unauthorized", null));
      return;
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json(createResponse(false, "Cart not found", null));
      return;
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter((i) => !i.productId.equals(productId));

    if (cart.items.length === initialLength) {
      res
        .status(404)
        .json(createResponse(false, "Product not found in cart", null));
      return;
    }

    await cart.save();
    res
      .status(200)
      .json(createResponse(true, "Cart item deleted successfully!", cart));
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json(createResponse(false, "Something went wrong!", error.message));
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      res.status(401).json(createResponse(false, "Unauthorized", null));
      return;
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json(createResponse(false, "Cart not found", null));
      return;
    }

    cart.items = [];

    await cart.save();
    res
      .status(200)
      .json(createResponse(true, "Cart cleared successfully!", []));
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json(createResponse(false, "Something went wrong!", error.message));
  }
};

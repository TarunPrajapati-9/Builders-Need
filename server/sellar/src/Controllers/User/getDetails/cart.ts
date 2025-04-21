import { Request, Response } from "express";
import { createResponse } from "../../../Utils/createResponse";
import Cart from "../../../Models/Cart";

export const getCartItems = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      res
        .status(401)
        .json(createResponse(false, "User not authenticated", null));
      return;
    }

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      res.status(200).json(createResponse(true, "Cart is empty", []));
      return;
    }

    res
      .status(200)
      .json(
        createResponse(true, "Cart items fetched successfully", cart.items)
      );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

import { Request, Response } from "express";
import Item from "../../../Models/Item";
import { createResponse } from "../../../Utils/createResponse";
import Seller from "../../../Models/Seller";

// get single item
export const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json(createResponse(false, "Item ID is required!", []));
      return;
    }

    const item = await Item.findById(id);
    if (!item) {
      res.status(404).json(createResponse(false, "Item not found!", []));
      return;
    }

    res.json(createResponse(true, "Item fetched successfully", item));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

export const getAllItems = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await Item.find();
    res.json(createResponse(true, "All items fetched successfully", items));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

export const getItemsByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { category } = req.query;
    if (!category) {
      res.status(400).json(createResponse(false, "Category is required!", []));
      return;
    }

    const items = await Item.find({ category });
    // console.log(items);
    res.json(
      createResponse(true, "Items fetched by category successfully", items)
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

export const getItemsBySeller = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sellerId = req.user.id;
    // console.log(sellerId);
    if (!sellerId) {
      res.status(400).json(createResponse(false, "Seller ID is required!", []));
      return;
    }

    const items = await Item.find({ sellerId });
    // console.log(items);
    res.json(
      createResponse(true, "Items fetched by seller successfully", items)
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

export const getItemsByLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { location } = req.query;

    if (!location) {
      res.status(400).json(createResponse(false, "Location is required!", []));
      return;
    }

    // Step 1: Find sellers by location
    const sellers = await Seller.find({ location });

    if (sellers.length === 0) {
      res.json(createResponse(true, "No sellers found for this location", []));
      return;
    }

    // Step 2: Get seller IDs from found sellers
    const sellerIds = sellers.map((seller) => seller._id);

    // Step 3: Find items whose sellerId matches these IDs
    const items = await Item.find({ sellerId: { $in: sellerIds } });

    res.json(
      createResponse(true, "Items fetched by location successfully", items)
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, "Internal Server Error", { error }));
  }
};

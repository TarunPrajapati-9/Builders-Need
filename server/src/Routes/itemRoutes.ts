import express, { Router } from "express";
import { addItem } from "../Controllers/Seller/items/addItem";
import {
  deleteItem,
  updateItem,
} from "../Controllers/Seller/items/updateAndDeleteItem";
import {
  getAllItems,
  getItem,
  getItemsByCategory,
  getItemsByLocation,
  getItemsBySeller,
} from "../Controllers/Seller/items/getItems";
import { authenticate } from "../Middleware/jwtAuthentication";

const router: Router = express.Router();

// Apply authenticate only to data-changing routes
router.post("/add-item", authenticate, addItem);
router.put("/update-item/:itemId", authenticate, updateItem);
router.delete("/delete-item/:itemId", authenticate, deleteItem);

// Public GET routes for both Users and Sellers
router.get("/get-item/:id", getItem);
router.get("/get-all-items", getAllItems);
router.get("/get-items-by-category", getItemsByCategory);
router.get("/get-items-by-seller", authenticate, getItemsBySeller);
router.get("/get-items-by-location", getItemsByLocation);

export default router;

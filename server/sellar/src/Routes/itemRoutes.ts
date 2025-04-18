import express, { Router } from "express";
import { addItem } from "../Controllers/items/addItem";
import {
  deleteItem,
  updateItem,
} from "../Controllers/items/updateAndDeleteItem";
import {
  getAllItems,
  getItem,
  getItemsByCategory,
  getItemsByLocation,
  getItemsBySeller,
} from "../Controllers/items/getItems";
import { authenticateSeller } from "../Middleware/jwtAuthentication";

const router: Router = express.Router();

// Apply authenticateSeller only to data-changing routes
router.post("/add-item", authenticateSeller, addItem);
router.put("/update-item/:itemId", authenticateSeller, updateItem);
router.delete("/delete-item/:itemId", authenticateSeller, deleteItem);

// Public GET routes for both Users and Sellers
router.get("/get-item/:id", getItem);
router.get("/get-all-items", getAllItems);
router.get("/get-items-by-category", getItemsByCategory);
router.get("/get-items-by-seller", getItemsBySeller);
router.get("/get-items-by-location", getItemsByLocation);

export default router;

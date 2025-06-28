import express, { Router } from "express";
import { authenticate } from "../Middleware/jwtAuthentication";
import { createWallet } from "../Controllers/User/wallet/createWallet";
import {
  addMoney,
  debitMoney,
} from "../Controllers/User/wallet/addAndDebitMoney";
import { getWallet } from "../Controllers/User/wallet/getWallet";
import { updatePin } from "../Controllers/User/wallet/updateWallet";

const router: Router = express.Router();

router.post("/create-wallet", authenticate, createWallet);
router.post("/add-money", authenticate, addMoney);
router.post("/debit-money", authenticate, debitMoney);

router.get("/get-wallet", authenticate, getWallet);

router.put("/update-wallet-pin", authenticate, updatePin);

export default router;

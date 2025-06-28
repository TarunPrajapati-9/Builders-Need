import express, { Router } from "express";
import { adminAuth } from "../Middleware/adminAuth";
import { getAllCreditTransactions } from "../Controllers/Admin/Payment/getPaymentsApproval";
import { adminLogin } from "../Controllers/Admin/authentication/login";
import { registerAdmin } from "../Controllers/Admin/authentication/register";
import { updatePaymentStatus } from "../Controllers/Admin/Payment/updatePaymentStatus";

const router: Router = express.Router();

router.post("/login", adminLogin);
router.post("/register", registerAdmin);

router.put("/payments-approval", adminAuth, updatePaymentStatus);

router.get("/payments-approval", adminAuth, getAllCreditTransactions);
router.get("/get-users");

export default router;

import { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import connectDB from "./Config/dbConnection";
import sellerRoutes from "./Routes/sellerRoutes";
import itemRoutes from "./Routes/itemRoutes";
import userRoutes from "./Routes/userRoutes";
import walletRoutes from "./Routes/walletRoutes";
import adminRoutes from "./Routes/AdminRoutes";

// Connect to the database
connectDB();

const app: Application = express();
const port: number = process.env.PORT ? Number(process.env.PORT) : 5000;

// console.log(port);

// Root route for basic testing
app.get("/", (req: Request, res: Response): void => {
  res.send("Hello From Seller Backend Server");
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/seller", sellerRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user/wallet", walletRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/admin", adminRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

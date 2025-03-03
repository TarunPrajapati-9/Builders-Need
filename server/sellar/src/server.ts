import express, { Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import connectDB from "./Config/dbConnection"; // Removed .js (TS will auto-resolve .ts)
import sellerRoutes from "./Routes/sellerRoutes";

// Connect to the database
connectDB();

const app: Application = express();
const port: number = 5000;

// Root route for basic testing
app.get("/", (req: Request, res: Response): void => {
  res.send("Hello From Seller Backend Server");
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Use seller routes for '/api/seller'
app.use("/api/seller", sellerRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

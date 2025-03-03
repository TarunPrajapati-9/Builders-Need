import { Schema, model, Document } from "mongoose";

// Define TypeScript interface for Seller
interface ISeller extends Document {
  name: string;
  email: string;
  password: string;
  location: string;
  type: "distributor" | "manufacturer"; // Restrict values
  items: ("Steel" | "Cement" | "Sand" | "Brick" | "Aggregate")[]; // Array with allowed values
  createdAt?: Date;
  updatedAt?: Date;
}

// Define Mongoose schema with TypeScript
const SellerSchema = new Schema<ISeller>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please fill a valid email address"], // Email validation
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      enum: ["Surat", "Ahmedabad", "Vadodara", "Rajkot"],
    },
    type: {
      type: String,
      required: true,
      enum: ["distributor", "manufacturer"],
    },
    items: {
      type: [String],
      required: true,
      enum: ["Steel", "Cement", "Sand", "Brick", "Aggregate"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the Mongoose model with TypeScript
export default model<ISeller>("Seller", SellerSchema);
